
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { GoogleGenerativeAI } from "npm:@google/generative-ai@^0.1.0";

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
    // 1. Handle CORS preflight requests
    if (req.method === "OPTIONS") {
        return new Response("ok", { headers: corsHeaders });
    }

    try {
        // 2. Authenticate
        // const authHeader = req.headers.get("Authorization");
        // if (!authHeader) throw new Error("Missing Authorization header");

        const apiKey = Deno.env.get("GEMINI_API_KEY");
        if (!apiKey) {
            // Return a Mock Response if API Key is missing (for local testing)
            console.warn("GEMINI_API_KEY missing. Returning mock data.");
            return new Response(
                JSON.stringify({
                    storeName: "Mock Store (No API Key)",
                    hero: { title: "Set Your API Key", subtitle: "To generate real stores.", ctaText: "Fix Config", ctaLink: "#" },
                    products: []
                }),
                { headers: { ...corsHeaders, "Content-Type": "application/json" } }
            );
        }

        // 3. Parse Input
        const { prompt, locale } = await req.json();

        // 4. Call Gemini
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const localeInstruction = locale === "fr" ? "Reponds en francais. Genere les noms et descriptions des produits en francais simple, accessible a un commercant ouest-africain." : "Respond in English. Generate product names and descriptions in plain West African English.";

        const systemPrompt = `
      ${localeInstruction}
      You are an expert E-commerce Architect.
      Generate a JSON configuration for a retail store based on the user's description.
      
      Output JSON Format:
      {
        "storeName": "string",
        "hero": {
          "title": "string",
          "subtitle": "string",
          "ctaText": "string"
        },
        "products": [
          { "name": "string", "description": "string", "price": number, "currency": "XAF" }
        ]
      }
    `;

        const result = await model.generateContent([systemPrompt + " " + localeInstruction, `User Request: ${prompt}`]);
        const responseText = result.response.text();

        // Clean JSON (remove markdown code blocks if any)
        const jsonString = responseText.replace(/```json|```/g, "").trim();
        const data = JSON.parse(jsonString);

        return new Response(JSON.stringify(data), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
        });

    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
    }
});

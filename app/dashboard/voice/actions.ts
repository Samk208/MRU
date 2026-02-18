'use server'

import { model } from "@/lib/gemini";
import { z } from "zod";

const transactionSchema = z.object({
    type: z.enum(["sale", "expense", "stock_in", "stock_out"]).optional().default("sale"),
    item: z.string().describe("The name of the item or product involved"),
    amount: z.string().describe("The monetary value with currency if present, e.g. 'LRD 500'"),
    customer: z.string().optional().describe("Updates customer name if mentioned"),
    quantity: z.string().optional().describe("Quantity of items if mentioned"),
});

export async function parseTransaction(transcript: string) {
    if (!transcript || transcript.trim().length < 5) {
        return { error: 'Transcript too short' };
    }

    const prompt = `
    Extract transaction details from the following voice transcript spoken by a merchant in Guinea/Liberia.
    Return ONLY a JSON object. Do not include markdown formatting like \`\`\`json.
    
    Transcript: "${transcript}"

    Output JSON keys:
    - type: "sale" | "expense" | "stock_in" | "stock_out" (default to "sale" if ambiguous)
    - item: string (e.g., "3 bags of rice")
    - amount: string (e.g., "LRD 15,000", keep original currency if stated, else infer local context)
    - customer: string (optional, e.g., "pending" or name like "Mamadou")
    - quantity: number (optional, raw number)
    - currency: string (optional, inferred currency code e.g. "GNF" or "LRD")
  `;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Clean potential markdown code blocks
        const cleanedText = text.replace(/```json/g, '').replace(/```/g, '').trim();

        const data = JSON.parse(cleanedText);

        // Basic validation could go here
        return { data };
    } catch (error) {
        console.error("Gemini Parse Error:", error);
        return { error: "Failed to parse transaction" };
    }
}

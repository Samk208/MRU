import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GOOGLE_API_KEY;

if (!apiKey) {
    console.warn("GOOGLE_API_KEY is not set in environment variables.");
}

const genAI = new GoogleGenerativeAI(apiKey || "");

// Use Gemini 1.5 Flash for speed and cost efficiency
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export { model };

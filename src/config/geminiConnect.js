import { GoogleGenerativeAI } from "@google/generative-ai";

async function geminiConnect() {
    return new GoogleGenerativeAI(process.env.GEMINI_PASSWORD);
}

export default geminiConnect;
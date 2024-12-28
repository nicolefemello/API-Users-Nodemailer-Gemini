import geminiConnect from "../config/geminiConnect.js";

const genAI = await geminiConnect();
const modelLanguage = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export default modelLanguage;
import geminiConnect from '../config/geminiConnect.js';

const genAI = await geminiConnect();
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
const chatAI = model.startChat({
        history: [
          {
            role: "user",
            parts: [
              {
                text: "Olá, qual seu nome e quem é você?",
              },
            ],
          },
          {
            role: "model",
            parts: [
              {
                text: "Olá! Eu sou o Kratus. Sou especializado em responder perguntas sobre esportes, vida saudável, nutrição e hábitos saudáveis. Não consigo responder perguntas fora desse nicho. Como posso te ajudar?",
              },
            ],
          }
        ],
      });

export default chatAI;
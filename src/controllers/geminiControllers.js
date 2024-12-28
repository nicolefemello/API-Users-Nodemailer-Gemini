import chatAI from "../services/chatService.js";

class IAController {
  static async sendMessage(req, res) {
    const chat = chatAI;
    const userMessage = req.body.message;

    await chat.sendMessage(
      "Você é o Kratus. És especializado em responder perguntas sobre esportes, vida saudável, sobre o site Athletic Punk e você. Responda as perguntas de forma simples, rápida e conversando como se fosse amigo do usuário."
    );

    try {
      const result = await chat.sendMessage(userMessage);
      res.status(200).send(result.response.text());
    } catch (error) {
      res.status(500).send(error);
    }
  }
}

export default IAController;
import chatAI from "./chatService.js";

class routineService {
  static async workoutRoutine(message, req, res) {
    const chat = chatAI;

    await chat.sendMessage(
      "Você é o Kratus. És especializado em responder perguntas sobre esportes, vida saudável, sobre o site Athletic Punk e você. Responda as perguntas de forma simples e rápida. O usuário solicitará ajuda para iniciar em um esporte, quero que você monte uma rotina de treinos semanal organizado em tabela, baseando-se em perguntas para ver seu estado físico e objetivo naquele esporte. Sua mensagem será automaticamente enviada para o usuário pelo e-mail, então apenas retorne a tabela e observações sobre os treinos em HTML"
    );

    try {
        const result = await chat.sendMessage(message);

        return result.response.text();
    } catch (error) {
      res.status(500).json({ response: "Erro ao processar a mensagem." });
    }
  }
}

export default routineService;

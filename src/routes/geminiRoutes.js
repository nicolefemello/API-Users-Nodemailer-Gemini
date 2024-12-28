import IAController from "../controllers/geminiControllers.js";

const geminiRoutesInit = (app) => {
    app.post('/chat', IAController.sendMessage);
}

export default geminiRoutesInit;
import express from 'express';
import routes from './routes/index.js';
import dbConnect from './config/dbConnect.js';
import geminiConnect from './config/geminiConnect.js';

const app = express();
app.use(express.json());
routes(app);

const dbConnection = await dbConnect();

dbConnection.on("error", (error) => {
    console.error("error" + error);
})

dbConnection.once("open", () => {
    console.log("Banco de dados conectado");
})

const genAI = await geminiConnect();
        
    if (genAI) {
        console.log("Gemini conectado");
    } else {
        console.log("Falha ao conectar com a API.");
    }

export default app;
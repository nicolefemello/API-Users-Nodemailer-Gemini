import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

async function dbConnect() {
    mongoose.connect(process.env.DB_STRING);
    return mongoose.connection;
}

export default dbConnect;
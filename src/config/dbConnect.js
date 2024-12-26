import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

async function dbConnect() {
    mongoose.connect(process.env.DB_STRING);
    return mongoose.connection;
}

export default dbConnect;
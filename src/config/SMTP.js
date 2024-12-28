import dotenv from "dotenv";
dotenv.config();

const SMTP = {
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    from: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD
}

export default SMTP;
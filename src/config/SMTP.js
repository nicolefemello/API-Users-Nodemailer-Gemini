import dotenv from 'dotenv';
dotenv.config();

const SMTP = {
    from: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD
}

export default SMTP;
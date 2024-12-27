import nodemailer from "nodemailer";
import SMTP from "../config/SMTP.js";

const transport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: SMTP.from,
    pass: SMTP.pass,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export default transport;
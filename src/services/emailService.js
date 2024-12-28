import nodemailer from "nodemailer";
import SMTP from "../config/SMTP.js";

class emailServices {
  static async sendEmail(to, subject, message) {
    const transporter = nodemailer.createTransport({
    host: SMTP.host,
    port: SMTP.port,
    secure: SMTP.secure,
    auth: {
      user: SMTP.from,
      pass: SMTP.pass,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const sendEmail = await transporter.sendMail({
    from: SMTP.from,
    to: to,
    subject: subject,
    html: message
  }).catch((error) => console.error(error));
}
}


export default emailServices;
import nodemailer from "nodemailer";
import SMTP from "../config/SMTP.js";
import transport from "../services/emailService.js";
import User from "../models/userModel.js";

class emailsControllers {
  static async welcomeEmail(req, res) { //welcome email
    const email = req.body.email;
    const name = req.body.name;

    try {
      const transporter = transport;

      const sendEmail = await transporter
        .sendMail({
          from: SMTP.from,
          to: email,
          subject: "Bem-vind@ ao Athletic Punk! 🚀",
          html: `<h1>Olá, ${name}!</h1><br>
                    <p>É com muita alegria que damos as boas-vindas à comunidade Athletic Punk! 🎉 Aqui, você encontrará um espaço dedicado a esportes, saúde e bem-estar, com conteúdos incríveis sobre basquete, futebol, ginástica, vôlei e muito mais.</p>
                    <p>Explore, conecte-se com outros entusiastas e aproveite as funcionalidades da nossa plataforma, como seu perfil personalizado e nosso chatbot inteligente. Estamos animados para fazer parte da sua jornada esportiva!</p>
                    <p>Qualquer dúvida, estamos por aqui.</p><br>
                    Abraços,<br>
                        Equipe Athletic Punk 🏀⚽🤸‍♀️`,
        }).catch((error) => console.error(error));

        const user = await User.findOne({ email });
        user.emailsSend.push({ sendEmail });
        await user.save();

      res.status(200).send("Email sent successfully!");
    } catch (error) {
      res.status(500).send("Internal Server Error" + error);
    }
  }

  static async workoutRoutineEmail(req, res) { //workout routine
    let email;
    let name;
    const workoutRoutine = "segunda: perna, terça: costas...";

    try {
      const transporter = transport;

      const sendEmail = await transporter
        .sendMail({
          from: SMTP.from,
          to: email,
          subject: "Rotina de treinos 🚀",
          html: `<h1>Olá, ${name}!</h1><br>
                    <p>Seu treino gerado pelo Kratos, nosso assistente virtual, está pronto e disponível também para download! Acesse aqui! 👇</p>
                    <p>${workoutRoutine}</p>
                    <p>É com muita alegria que agradecemos pela confiança e parceria com a Athletic Punk. Obrigado! Lembre-se:<i> “O esporte é tão incrível que não muda só sua saúde, mas seu hábito, sua rotina, suas metas, seu corpo e consequentemente sua vida!”</i>.</p>
                    Abraços,<br>
                        Equipe Athletic Punk 🏀⚽🤸‍♀️`,
        }).catch((error) => console.error(error));

      const user = await User.findOne({ email });
      user.emailsSend.push({ sendEmail });
      await user.save();

      res.status(200).send("Email sent successfully!");
    } catch (error) {
      res.status(500).send("Internal Server Error" + error);
    }
  }

  static async loginEmail(req, res) { //login
    const email = req.body.email;
    const name = req.body.name;
    const newPassword = "link to new password";

    try {
      const transporter = transport;

      const sendEmail = await transporter
        .sendMail({
          from: SMTP.from,
          to: email,
          subject: "Login detectado! ⚠️",
          html: `<h1>Olá, ${name}!</h1><br>
                    <p>Detectamos um início de acesso em sua conta no Athletic Punk!</p>
                    <p>Se foi você, apenas ignore este e-mail...<p>
                    <p>Se não foi você, clique neste link abaixo e mude sua senha. Iremos desconectar todos os acessos de sua conta!<p><br>
                    <p>${newPassword}</p><br>
                    <p>Aqui no Athletic Punk, nos importamos com sua segurança e de seus dados e, estamos aqui para protegê-los da melhor forma possível!😉</p>
                    Abraços,<br>
                        Equipe Athletic Punk 🏀⚽🤸‍♀️`,
        }).catch((error) => console.error(error));

      const user = await User.findOne({ email });
      user.emailsSend.push({ sendEmail });
      await user.save();

      res.status(200).send("Email sent successfully!");
    } catch (error) {
      res.status(500).send("Internal Server Error" + error);
    }
  }

  static async updateAccountEmail(req, res) { //update email
    let email;
    let name;
    const newPassword = "link to new password";

    try {
      const transporter = transport;

      const sendEmail = await transporter
        .sendMail({
          from: SMTP.from,
          to: email,
          subject: "Mudança detectada! ⚠️",
          html: `<h1>Olá, ${name}!</h1><br>
                    <p>Detectamos uma edição em sua conta no Athletic Punk!</p>
                    <p>Se foi você, apenas ignore este e-mail...<p>
                    <p>Se não foi você, clique neste link abaixo e mude sua senha. Iremos desconectar todos os acessos de sua conta!<p><br>
                    <p>${newPassword}</p><br>
                    <p>Aqui no Athletic Punk, nos importamos com sua segurança e de seus dados e, estamos aqui para protegê-los da melhor forma possível!😉</p>
                    Abraços,<br>
                        Equipe Athletic Punk 🏀⚽🤸‍♀️`,
        }).catch((error) => console.error(error));

      const user = await User.findOne({ email });
      user.emailsSend.push({ sendEmail });
      await user.save();

      res.status(200).send("Email sent successfully!");
    } catch (error) {
      res.status(500).send("Internal Server Error" + error);
    }
  }

  static async deleteEmail(req, res) { //delete email
    let email;
    let name;

    try {
      const transporter = transport;

      const sendEmail = await transporter
        .sendMail({
          from: SMTP.from,
          to: email,
          subject: "Conta excluída! ⚠️",
          html: `<h1>Olá, ${name}!</h1><br>
                    <p>Sua conta no Athletic Punk foi deletada!</p>
                    <p>Uma pena que não é mais um usuário do nosso site... Ocorreu algo? Tem algum feedback que deseja enviar?</p>
                    <p>Pedimos desculpas se não atingimos suas expectativas...</p>
                    Abraços,<br>
                        Equipe Athletic Punk 🏀⚽🤸‍♀️`,
        }).catch((error) => console.error(error));

      res.status(200).send("Email sent successfully!");
    } catch (error) {
      res.status(500).send("Internal Server Error" + error);
    }
  }
}

export default emailsControllers;

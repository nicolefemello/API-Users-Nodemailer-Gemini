import emailService from "../services/emailService.js";
import User from "../models/userModel.js";
import routineService from "../services/routineService.js";
import UserController from "./usersControllers.js";

class emailsControllers {
  static async welcomeEmail(req, res) {
    try {
      const email = req.body.email;
      const user = await User.findOne({ email });

      const subject = "Bem-vind@ ao Athletic Punk! 🚀";
      const message = `<h1>Olá, ${user.name}!</h1><br><p>É com muita alegria que damos as boas-vindas à comunidade Athletic Punk! 🎉 Aqui, você encontrará um espaço dedicado a esportes, saúde e bem-estar, com conteúdos incríveis sobre basquete, futebol, ginástica, vôlei e muito mais.</p><p>Explore, conecte-se com outros entusiastas e aproveite as funcionalidades da nossa plataforma, como seu perfil personalizado e nosso chatbot inteligente. Estamos animados para fazer parte da sua jornada esportiva!</p><p>Qualquer dúvida, estamos por aqui.</p><br>Abraços,<br>Equipe Athletic Punk 🏀⚽🤸‍♀️`;

      await emailService.sendEmail(user.email, subject, message);
      
        const newEmail = {
          subject: subject,
          message: message,
          dateSent: new Date()
        };

      res.status(200).send("Email sent successfully!");
    } catch (error) {
      res.status(500).send("Internal Server Error" + error);
    }
  }

  static async workoutRoutineEmail(req, res) {
    try {
      const user = await User.findById(req.params.id);

      if (req.body.message == null) return res.status(400).send("Send a message!");
      const workout = await routineService.workoutRoutine(req.body.message);

      const subject = "Rotina de treinos 🚀";
      const message = `<h1>Olá, ${user.name}!</h1><br><p>Seu treino gerado pelo Kratos, nosso assistente virtual, está pronto e disponível também para download! Acesse aqui! 👇</p><p>${workout}</p><p>É com muita alegria que agradecemos pela confiança e parceria com a Athletic Punk. Obrigado! Lembre-se:<i> “O esporte é tão incrível que não muda só sua saúde, mas seu hábito, sua rotina, suas metas, seu corpo e consequentemente sua vida!”</i>.</p>Abraços,<br>Equipe Athletic Punk 🏀⚽🤸‍♀️`;

      await emailService.sendEmail(user.email, subject, message);
      
        const newEmail = {
          subject: subject,
          message: message,
          dateSent: new Date()
        };

      user.emailsSend.push(newEmail);
      await user.save();

      res.status(200).send("Email sent successfully!");
    } catch (error) {
      res.status(500).send("Internal Server Error" + error);
    }
  }

  static async loginEmail(req, res) {
    try {
      const email = req.body.email;
      const user = await User.findOne({ email });
      const newPassword = "link to new password";

      const subject = "Login detectado! ⚠️";
      const message = `<h1>Olá, ${user.name}!</h1><br><p>Detectamos um início de acesso em sua conta no Athletic Punk!</p><p>Se foi você, apenas ignore este e-mail...<p><p>Se não foi você, clique neste link abaixo e mude sua senha. Iremos desconectar todos os acessos de sua conta!<p><br><p>${newPassword}</p><br><p>Aqui no Athletic Punk, nos importamos com sua segurança e de seus dados e, estamos aqui para protegê-los da melhor forma possível!😉</p>Abraços,<br>Equipe Athletic Punk 🏀⚽🤸‍♀️`;

      await emailService.sendEmail(email, subject, message);
      
        const newEmail = {
          subject: subject,
          message: message,
          dateSent: new Date()
        };

      res.status(200).send("Email sent successfully!");
    } catch (error) {
      res.status(500).send("Internal Server Error" + error);
    }
  }

  static async updateAccountEmail(req, res) {
    try {
      const user = await User.findById(req.params.id);
      const newPassword = "link to new password";

      const subject = "Mudança detectada! ⚠️";
      const message = `<h1>Olá, ${user.name}!</h1><br><p>Detectamos uma edição em sua conta no Athletic Punk!</p><p>Se foi você, apenas ignore este e-mail...<p><p>Se não foi você, clique neste link abaixo e mude sua senha. Iremos desconectar todos os acessos de sua conta!<p><br><p>${newPassword}</p><br><p>Aqui no Athletic Punk, nos importamos com sua segurança e de seus dados e, estamos aqui para protegê-los da melhor forma possível!😉</p>Abraços,<br>Equipe Athletic Punk 🏀⚽🤸‍♀️`;

      await emailService.sendEmail(user.email, subject, message);
      
        const newEmail = {
          subject: subject,
          message: message,
          dateSent: new Date()
        };

      res.status(200).send("Email sent successfully!");
    } catch (error) {
      res.status(500).send("Internal Server Error" + error);
    }
  }

  static async deleteEmail(req, res) {
    try {
      const user = await User.findById(req.params.id);

      const userDelete = await UserController.deleteUser(req.body.password, user);
      if (userDelete != null) return res.status(400).send(userDelete);

      const newPassword = "link to new password";

      const subject = "Conta excluída! ⚠️";
      const message = `<h1>Olá, ${user.name}!</h1><br><p>Sua conta no Athletic Punk foi deletada!</p><p>Uma pena que não é mais um usuário do nosso site... Ocorreu algo? Tem algum feedback que deseja enviar?</p><p>Pedimos desculpas se não atingimos suas expectativas...</p>Abraços,<br>Equipe Athletic Punk 🏀⚽🤸‍♀️`;

      await emailService.sendEmail(user.email, subject, message);

      res.status(200).send("Email sent successfully!");
    } catch (error) {
      res.status(500).send("Internal Server Error" + error);
    }
  }
}

export default emailsControllers;

import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import validatePassword from "../middlewares/passwordMiddleware.js";

class UserController {
  static async createUser(req, res, next) { //post user
    try {
      const email = req.body.email;
      const existingEmail = await User.findOne({ email });
      if (existingEmail) //verifica se o email está em uso ou não
        res.status(409).send("The email " + email + "is already in use."); 

      const passwordValid = validatePassword(req.body.password);

      if (passwordValid == false) { //verifica se a senha é válida
        return res.status(400).send("The password must contain between 8 and 20 characters, a lowercase letter, a number and special characters!");
      }

      const passwordHash = await bcrypt.hash(req.body.password, 8);

      const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: passwordHash,
      });

      next();
    } catch (error) {
      res.status(500).send("Error creating user! " + error);
    }
  }

  static async showUsers(req, res) { //get users
    try {
      const users = await User.find();

      res.status(200).send("Users found: " + users);
    } catch (error) {
      res.status(500).send("Error finding users! " + error);
    }
  }

  static async updateUser(req, res, next) { //put user
    try {
      const { email, currentPassword, newPassword, name } = req.body;

      const user = await User.findById(req.params.id);
      const verify = await bcrypt.compare(currentPassword, user.password);

      if (verify) {

        if (email) {
          const existingEmail = await User.findOne({ email });
          if (existingEmail.id.toString() != user.id) {
            return res
              .status(409)
              .send("You already have a user with this email!");
          } else if (existingEmail == user.id) {
            return res
              .status(409)
              .send("The new email must be different from the old email!");
          } else {
            await User.findByIdAndUpdate(user.id, { email });
          }

        } else if (newPassword) {
          if (currentPassword == newPassword) {
            return res
              .status(401)
              .send(
                "The new password must be different from the old password!"
              );
          } else {
            const hashedPassword = await bcrypt.hash(req.body.newPassword, 8);
            user.password = hashedPassword;
            await user.save();
          }

        } else if (name) {
          await User.findByIdAndUpdate(user.id, { name });
        }
        next();
      } else {
        res.status(401).send("Incorrect password!");
      }
    } catch (error) {
      res.status(500).send("Error updating user! " + error);
    }
  }

  static async deleteUser(req, res, next) { //delete user
    try {
      const user = await User.findById(req.params.id);
      const password = req.body.password;
      const verify = await bcrypt.compare(password, user.password);

      if (verify) {
        await User.findByIdAndDelete(user.id);
        next();
      } else {
        res.status(401).send("Incorrect password!");
      }
    } catch (error) {
      res.status(500).send("Error deleting user! " + error);
    }
  }
}

export default UserController;

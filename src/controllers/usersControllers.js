import emailMiddleware from "../middlewares/emailMiddleware.js";
import passwordMiddleware from "../middlewares/passwordMiddleware.js";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";

class UserController {
  static async createUser(req, res, next) {
    try {
      if (req.body.email == null && req.body.password == null && req.body.name == null) return res.status(400).send("All fields must be filled in");

      const validateEmail = await emailMiddleware.existingEmail(req.body.email);
      if (validateEmail != null) return res.status(400).send(validateEmail);

      const isValidatePassword = await passwordMiddleware.validatePassword(req.body.password);
      if (!isValidatePassword) return res.status(400).send("The password must contain between 8 and 20 characters, a lowercase letter, a number and special characters!");

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

  static async showUsers(req, res) {
    try {
      const users = await User.find();

      res.status(200).send("Users found: " + users);
    } catch (error) {
      res.status(500).send("Error finding users! " + error);
    }
  }

  static async updateUser(req, res, next) {
    try {
      if (req.body.currentPassword != null) {

        const email = req.body.email;
        const currentPassword = req.body.currentPassword;
        const newPassword = req.body.newPassword;
        const name = req.body.name;

        const user = await User.findById(req.params.id);
        const verify = await bcrypt.compare(currentPassword, user.password);

        if (verify) {

          if (email != undefined) {
            const validateEmail = await emailMiddleware.existingEmail(req.body.email);
            if (validateEmail != null) return res.status(409).send(validateEmail);
            await User.findByIdAndUpdate(user.id, { email });

          } else if (newPassword != undefined) {
            if (currentPassword == newPassword) {
              return res.status(401).send("The new password must be different from the old password!");
            } else {
              const isValidatePassword = await passwordMiddleware.validatePassword(newPassword);
              if (!isValidatePassword) return res.status(400).send("The password must contain between 8 and 20 characters, a lowercase letter, a number and special characters!");

              const hashedPassword = await bcrypt.hash(newPassword, 8);
              user.password = hashedPassword;
              await user.save();
            }

          } else if (name != undefined) {
            await User.findByIdAndUpdate(user.id, { name });
          }
          next();
        } else {
          res.status(401).send("Incorrect password!");
        }
      } else  {
        res.status(400).send("The password is obrigatory!");
      }
    } catch (error) {
      res.status(500).send("Error updating user! " + error);
    }
  }

  static async deleteUser(password, user, next) {
    try {
      if (password != null) {
        const verify = await bcrypt.compare(password, user.password);
  
        if (verify) {
          await User.findByIdAndDelete(user.id);
        } else {
          return "Incorrect password!";
        }
      } else {
        return "Password is obrigatory!";
      }
    } catch (error) {
      return "Error deleting user! " + error;
    }
  }
}

export default UserController;

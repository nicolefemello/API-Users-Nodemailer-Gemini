import emailMiddleware from "../middlewares/emailMiddleware.js";
import passwordMiddleware from "../middlewares/passwordMiddleware.js";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";

import userService from "../services/userService.js";

class UserController {
  static async createUser(req, res, next) {
    try {
      if (req.body.email == null || req.body.password == null || req.body.name == null) return res.status(400).send("All fields must be filled in");
    
      const userCreate = await userService.createUser(req.body.email, req.body.password, req.body.name);
      if (userCreate != null) return res.status(400).send(userCreate); 

      next();
    } catch (error) {
      res.status(500).send("Error creating user! " + error);
    }
  }

  static async showUsers(req, res) {
    try {
      res.status(200).send("Users found: " + await User.find());
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
          const userUpdate = await userService.updateUser(email, newPassword, name, user, currentPassword);
          if (userUpdate != null) return res.status(400).send(userUpdate);
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

  static async showUser(req, res) {
    
  }
}

export default UserController;

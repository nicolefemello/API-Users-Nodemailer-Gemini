import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import createToken from "../services/tokenService.js";

class authControllers {
  static async login(req, res, next) {
    try {
      const email = req.body.email;
      const user = await User.findOne({ email });

      if (user) {
        const verify = await bcrypt.compare(req.body.password, user.password);
        if (!verify) return res.status(400).send("Password Invalid!");

        const token = await createToken(email);
        console.log(token);
        return res.status(200).send("Token created!");
        
      } else {
        return res.status(400).send("User not found!");
      }

      next();
    } catch (error) {
      res.status(500).send("Error in login user! " + error);
    }
  }

  static async logout(req, res) {
    
  }
}

export default authControllers;

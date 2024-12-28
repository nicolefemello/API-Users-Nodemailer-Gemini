import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

class authControllers {
  static async login(req, res, next) {
    try {
      const email = req.body.email;
      const password = req.body.password;

      const user = await User.findOne({ email });
      const verify = await bcrypt.compare(password, user.password);

      if (verify) {
        const token = jwt.sign({ email: user.email }, process.env.KEY_TOKEN);
        next();
      } else {
        res.status(401).send("Password invalid!");
      }
    } catch (error) {
      res.status(500).send("Error in login user! " + error);
    }
  }

  static async logout(req, res) {}
}

export default authControllers;

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

async function createToken(email, password) {
  try {
    const user = await User.findOne({ email });
    if (user) {
      const verify = await bcrypt.compare(password, user.password);
      if (!verify) return res.status(401).send("Password Invalid!");

      return jwt.sign(email, process.env.KEY_TOKEN);
    } else {
      return res.status(404).send("User not found!");
    }
  } catch (error) {
    res.status(500).send(error);
  }
}

export default createToken;

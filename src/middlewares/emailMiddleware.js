import mongoose from "mongoose";
import User from "../models/userModel.js";

class emailMiddleware {
  static async existingEmail(email) {
    const user = await User.findOne({ email });

    if (user) {
      if (user.email == email) {
        return "You already have a user with this email!";
      } else {
        return "The email " + email + " is already in use!";
      }
    }
  }
}

export default emailMiddleware;

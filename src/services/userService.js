import emailMiddleware from "../middlewares/emailMiddleware.js";
import passwordMiddleware from "../middlewares/passwordMiddleware.js";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";

class userService {
  static async createUser(email, password, name) {
    try {
      const validateEmail = await emailMiddleware.existingEmail(email);
      if (validateEmail != null) return validateEmail;

      const isValidatePassword = await passwordMiddleware.validatePassword(password);
      if (!isValidatePassword) return "The password must contain between 8 and 20 characters, a lowercase letter, a number and special characters!";

      const passwordHash = await bcrypt.hash(password, 8);

      const user = await User.create({
        name: name,
        email: email,
        password: passwordHash,
      });
    } catch (error) {
      return error;
    }
  }

  static async updateUser(email, newPassword, name, user, currentPassword) {
    try {
      if (email != null) {
        const validateEmail = await emailMiddleware.existingEmail(email);
        if (validateEmail != null) return validateEmail;

        await User.findByIdAndUpdate(user.id, { email });
      } 
      
      if (newPassword != null) {
        if (currentPassword == newPassword) {
            return "The new password must be different from the old password!";

        } else {
          const isValidatePassword = await passwordMiddleware.validatePassword(newPassword);
          if (!isValidatePassword)
            return "The password must contain between 8 and 20 characters, a lowercase letter, a number and special characters!";

          const hashedPassword = await bcrypt.hash(newPassword, 8);
          user.password = hashedPassword;
          await user.save();
        }
      } 
      
      if (name != undefined) {
        await User.findByIdAndUpdate(user.id, { name });
      }
    } catch (error) {
      return error;
    }
  }
}

export default userService;

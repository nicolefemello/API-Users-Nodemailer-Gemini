import mongoose, { model } from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  emailsSend: [
    {
      from: { type: String },
      to: { type: String },
      subject: { type: String },
      message: { type: String }
    },
  ],
});

const User = mongoose.model("User", userSchema);

export default User;

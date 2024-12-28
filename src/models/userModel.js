import mongoose, { model } from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  emailsSend: [
    {
      subject: { type: String },
      message: { type: String },
      dateSent: { type: Date, default: Date.now }
    },
  ],
});

const User = mongoose.model("User", userSchema);

export default User;

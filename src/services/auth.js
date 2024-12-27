import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import User from "../models/userModel.js";

async function auth(reqEmail, reqPassword, res, next) {
  passport.use(
    new LocalStrategy(
      {
        userEmail: reqEmail,
        userPassword: reqPassword,
      },
      async (email, password, done) => {
        try {
          const user = await User.findOne({ email });
          if (!user) {
            return done(null, false, { message: "Usuário não encontrado." });
          }

          const isValid = await user.verifyPassword(password);
          if (!isValid) {
            return done(null, false, { message: "Senha inválida." });
          }

          return done(null, user);
        } catch (err) {
          return done(err);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
}

export default auth;

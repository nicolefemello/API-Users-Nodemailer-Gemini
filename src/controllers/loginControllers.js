import auth from "../services/auth.js";

class loginControllers {
  static async login(req, res, next) {
    try {
      const authLogin = auth(req.body.email, req.body.password);

      next();
    } catch (error) {
      res.status(500).send("Error logging in " + error);
    }
  }
}

export default loginControllers;

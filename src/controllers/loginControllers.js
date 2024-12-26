import User from '../models/userModel.js';
import bcrypt from 'bcrypt';
import JsonWebToken  from 'jsonwebtoken';

class loginControllers {
    static async login(req, res, next) {
        const email =  req.body.email;
        const user = await User.findOne({email});
        const verify = await bcrypt.compare(req.body.password, user.password);

        if (verify) {
            next();
        } else {
            res.status(500).send("Erro no login");
        }
    }
}

export default loginControllers;
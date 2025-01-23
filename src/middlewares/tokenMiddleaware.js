import jwt from "jsonwebtoken";

class tokenMiddleware {
    async validateToken(req, res, next) {
        try {
            return jwt.verify()
        } catch (error) {
            res.status(500).send(error);
        }
    }
}

export default tokenMiddleware;
import authControllers from "../controllers/authControllers.js";
import emailsControllers from "../controllers/emailsControllers.js";

const authRoutesInit = (app) => {
    app.post('/login', authControllers.login, emailsControllers.loginEmail);
    app.get('/logout', authControllers.logout);
}

export default authRoutesInit;
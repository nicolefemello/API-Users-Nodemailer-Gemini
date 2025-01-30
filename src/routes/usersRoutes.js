import emailsControllers from "../controllers/emailsControllers.js";
import UserController from "../controllers/usersControllers.js";

const userRoutesInit = (app) => {
    app.get('/users', UserController.showUsers); //dev
    app.post('/auth/cadastre-se', UserController.createUser, emailsControllers.welcomeEmail);
    app.patch('/minha-conta/:id', UserController.updateUser, emailsControllers.updateAccountEmail);
    app.delete('/minha-conta/:id', emailsControllers.deleteEmail);
    app.get('/minha-conta/:id', UserController.showUser);
}

export default userRoutesInit;
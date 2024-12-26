import emailsControllers from "../controllers/emailsControllers.js";
import UserController from "../controllers/usersControllers.js";

const userRoutesInit = (app) => {
    app.get('/users', UserController.showUsers);
    app.post('/users', UserController.createUser, emailsControllers.welcomeEmail);
    app.patch('/users/:id', UserController.updateUser, emailsControllers.updateAccountEmail);
    app.delete('/users/:id', UserController.deleteUser, emailsControllers.deleteEmail);
}

export default userRoutesInit;
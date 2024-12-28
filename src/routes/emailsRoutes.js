import emailsControllers from "../controllers/emailsControllers.js";

const emailRoutesInit = (app) => {
    app.post('/welcome', emailsControllers.welcomeEmail);
    app.post('/routine/:id', emailsControllers.workoutRoutineEmail);
    app.post('/login-email', emailsControllers.loginEmail);
    app.post('/update', emailsControllers.updateAccountEmail);
    app.post('/delete', emailsControllers.deleteEmail);
}

export default emailRoutesInit;
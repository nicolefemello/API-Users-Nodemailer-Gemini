import emailsControllers from "../controllers/emailsControllers.js";

const emailRoutesInit = (app) => {
    app.post('/welcome', emailsControllers.welcomeEmail);
    app.post('/routine', emailsControllers.workoutRoutineEmail);
    app.post('/login-email', emailsControllers.loginEmail);
    app.post('/update', emailsControllers.updateAccountEmail);
    app.post('/delete', emailsControllers.deleteEmail);
}

export default emailRoutesInit;
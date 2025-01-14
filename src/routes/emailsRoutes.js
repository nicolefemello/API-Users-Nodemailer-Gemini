import emailsControllers from "../controllers/emailsControllers.js";

const emailRoutesInit = (app) => {
    app.post('/welcome-email', emailsControllers.welcomeEmail);
    app.post('/routine/:id', emailsControllers.workoutRoutineEmail);
    app.post('/login-email', emailsControllers.loginEmail);
    app.post('/update-email', emailsControllers.updateAccountEmail);
    app.post('/delete-email', emailsControllers.deleteEmail);
}

export default emailRoutesInit;
import loginControllers from '../controllers/loginControllers.js';
import emailsControllers from '../controllers/emailsControllers.js';

const loginRoutesInit = (app) => {
    app.post('/login', loginControllers.login, emailsControllers.updateAccountEmail);
}

export default loginRoutesInit;
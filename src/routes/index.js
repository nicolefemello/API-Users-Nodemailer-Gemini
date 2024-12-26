import express from 'express';
import emailRoutesInit from './emailsRoutes.js';
import geminiRoutesInit from './geminiRoutes.js';
import loginRoutesInit from './loginRoutes.js';
import userRoutesInit from './usersRoutes.js';

const routes = (app) => {
    app.get('/', (req, res) => res.status(200).send("Welcome to the aplicaction!"));

    emailRoutesInit(app);
    geminiRoutesInit(app);
    loginRoutesInit(app);
    userRoutesInit(app);
}

export default routes;
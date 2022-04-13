import express from 'express';
const router = express.Router();
import passport from 'passport';

import User from '../Models/user';
import { UserDisplayName } from '../Util/index';

import { DisplayLoginPage, DisplayRegisterPage, ProcessLoginPage, ProcessLogoutPage, ProcessRegisterPage } from '../Controllers/auth';

/*********************************** AUTHENTICATION ROUTES ***************************/

/* GET display the login page. */
router.get('/login', DisplayLoginPage);

/* Process the login request */
router.post('/login', ProcessLoginPage);

/* GET display the register page. */
router.get('/register', DisplayRegisterPage);

/* Process the register request */
router.post('/register', ProcessRegisterPage);

/* Process the logout request */
router.get('/logout', ProcessLogoutPage);

export default router;

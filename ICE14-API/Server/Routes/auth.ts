import express from 'express';
const router = express.Router();

// controller instance
import { ProcessLoginPage, ProcessLogoutPage, ProcessRegisterPage } from '../Controllers/auth';

/*********************************** AUTHENTICATION ROUTES ***************************/

/* Process the login request */
router.post('/login', ProcessLoginPage);

/* Process the register request */
router.post('/register', ProcessRegisterPage);

/* Process the logout request */
router.get('/logout', ProcessLogoutPage);

export default router;

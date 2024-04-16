import express from 'express';
import { userLoginController, userLogoutController, userResetPassController } from '../config/dependencies.inversify';

const router = express.Router();

router.post('/login', userLoginController.userLogin.bind(userLoginController));
router.get('/logout', userLogoutController.userLogout.bind(userLogoutController));
router.post('/reset-password', userResetPassController.resetPassword.bind(userResetPassController));

export default router;
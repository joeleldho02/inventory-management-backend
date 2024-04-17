import express from 'express';
import { userLoginController, userLogoutController, userResetPassController, userUpdateStatusController } from '../config/dependencies.inversify';

const router = express.Router();

router.post('/login', userLoginController.userLogin.bind(userLoginController));
router.get('/logout', userLogoutController.userLogout.bind(userLogoutController));
router.post('/reset-password', userResetPassController.resetPassword.bind(userResetPassController));
router.post('/update-status', userUpdateStatusController.statusUpdate.bind(userUpdateStatusController));

export default router;
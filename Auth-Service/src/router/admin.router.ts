import express from 'express';
import { adminLoginController, adminLogoutController, adminResetPassController } from '../config/dependencies.inversify';

const router = express.Router();

router.post('/login', adminLoginController.adminLogin.bind(adminLoginController));
router.get('/logout', adminLogoutController.adminLogout.bind(adminLogoutController));
router.post('/reset-password', adminResetPassController.resetPassword.bind(adminResetPassController));

export default router;
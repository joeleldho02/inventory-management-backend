import express from 'express';
import { adminController } from '../config/dependencies.inversify';

const router = express.Router();

router.post('/login', adminController.adminLogin.bind(adminController));
router.get('/logout', adminController.adminLogout.bind(adminController));
router.post('/reset-password', adminController.resetPassword.bind(adminController));

export default router;
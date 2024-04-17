import express from 'express';
import { userController } from '../config/dependencies.inversify';

const router = express.Router();

router.post('/login', userController.userLogin.bind(userController));
router.get('/logout', userController.userLogout.bind(userController));
router.post('/reset-password', userController.resetPassword.bind(userController));
router.post('/update-status', userController.updateStatus.bind(userController));

export default router;
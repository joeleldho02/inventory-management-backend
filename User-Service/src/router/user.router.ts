import express from 'express';
import { userController } from '../config/dependencies.inversify';

const router = express.Router();

router.get('/user/:userId', userController.getUser.bind(userController));
router.get('/users', userController.getUsers.bind(userController));
router.post('/user', userController.addUser.bind(userController));
router.patch('/user', userController.updateUser.bind(userController));
router.delete('/user/:userId', userController.deleteUser.bind(userController));

export default router;
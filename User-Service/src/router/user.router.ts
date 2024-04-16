import express from 'express';
import { getUsersController, addUserController, deleteUserController, getUserController, updateUserController } from '../config/dependencies.inversify';

const router = express.Router();

router.get('/user/:userId', getUserController.getUser.bind(getUserController));
router.get('/users', getUsersController.getUsers.bind(getUsersController));
router.post('/user', addUserController.addUser.bind(addUserController));
router.patch('/user', updateUserController.updateUser.bind(updateUserController));
router.delete('/user/:userId', deleteUserController.deleteUser.bind(deleteUserController));

export default router;
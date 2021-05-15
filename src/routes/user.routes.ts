import {Router} from "express";
import validator from '../middlewares/validator';
import {userQuerySchema} from "../middlewares/schemes";
import userController from '../controllers/user.controller';

const router = Router();

router.get('/users', userController.getUsers);
router.get('/users/:id', userController.getUserById);
router.post('/users', validator.body(userQuerySchema), userController.createUser);
router.put('/users/:id', validator.body(userQuerySchema), userController.updateUserById);
router.delete('/users/:id', userController.deleteUser);

export default router;

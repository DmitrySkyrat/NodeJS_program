import {Router} from 'express';
import validator from '../middlewares/validator';
import {userQuerySchema} from '../middlewares/schemes';
import userController from '../controllers/user.controller';

const userRouter = Router();

userRouter.get('/users', userController.getUsers);
userRouter.get('/users/:id', userController.getUserById);
userRouter.post('/users', validator.body(userQuerySchema), userController.createUser);
userRouter.put('/users/:id', validator.body(userQuerySchema), userController.updateUserById);
userRouter.delete('/users/:id', userController.deleteUser);

export default userRouter;

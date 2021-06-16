import { Router } from 'express';
import userGroupsController from '../controllers/user-groups.controller';

const userGroupsRouter = Router();

userGroupsRouter.post('/', userGroupsController.create);

export default userGroupsRouter;

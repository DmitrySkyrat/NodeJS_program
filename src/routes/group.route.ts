import { Router } from 'express';
import groupController from '../controllers/group.controller';

const groupRouter = Router();

groupRouter.get('/groups', groupController.getAllGroups);
groupRouter.get('/groups/:id', groupController.getGroupById);
groupRouter.post('/groups', groupController.createGroup);
groupRouter.put('/groups/:id', groupController.updateGroup);
groupRouter.delete('/groups/:id', groupController.deleteGroup);

export default groupRouter;

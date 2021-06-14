import { Request, Response } from 'express';
import userGroupsService from '../services/user-groups.service';

class UserGroupsController {
  async create(req: Request, res: Response) {
    const {groupId, userIds} = req.body;
    await userGroupsService.addUsersToGroup(groupId, userIds);

    return res.status(201).json();
  }
}

const userGroupsController = new UserGroupsController();

export default userGroupsController;

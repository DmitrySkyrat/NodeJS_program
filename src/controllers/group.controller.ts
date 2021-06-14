import { Request, Response } from 'express';
import Group from '../database/models/group';

class GroupController {
  getAllGroups(req: Request, res: Response) {
    Group.findAll({raw: true})
    .then(groups => {
      return res.json(groups);
    });
  };

  getGroupById(req: Request, res: Response) {
    const id = req.params.id;

    Group.findByPk(id)
    .then(group => {
      if(!group) return res.status(404).json({ message: 'Not found' });

      return res.json(group);
    })
    .catch(err => {
      res.status(500).send(err);

      return console.log(err);
    });
  };

  createGroup(req: Request, res: Response) {
    const {name, permissions} = req.body;

    Group.create({
      name: name,
      permissions: permissions
    })
    .then(group => {
      return res.status(201).json(group);
    })
    .catch(err => {
      res.status(400).send(err);
      
      return console.log(err);
    });
  };

  updateGroup(req: Request, res: Response) {
    const id = req.params.id;
    const { name, permissions } = req.body;

    Group.update({
      name: name,
      permissions: permissions
    },
    {
      where: {
        id: id
      }
    })
    .then((updatedStatus) => {
      return res.status(204).json(updatedStatus);
    })
    .catch(err => {
      res.status(400).send(err);

      return console.log(err);
    });
  };

  deleteGroup(req: Request, res: Response) {
    const id = req.params.id;

    Group.destroy({
      where: {
        id: id
      }
    })
    .then((deletedId) => {
      return res.status(204).json(deletedId);
    })
    .catch(err => {
      res.status(404).send(err);
      
      return console.log(err);
    });
  };
}

const groupController = new GroupController();

export default groupController;

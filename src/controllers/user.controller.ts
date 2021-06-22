import {Request, Response} from 'express';
import {getAutoSuggestUsers} from '../services/user.service';
import User from '../database/models/user';
import hashService from '../services/hash.service';

class UserController {
  static readonly DEFAULT_USERS_LIMIT = 10;
  static readonly LOGIN_SUBSTRING = '';

  getUsers(req: Request, res: Response) {
    User.findAll({raw: true})
    .then(users => {
      const filteredUsers = getAutoSuggestUsers(users, UserController.LOGIN_SUBSTRING, UserController.DEFAULT_USERS_LIMIT);

      return res.json(filteredUsers);
    })
    .catch(err => {
      res.status(500).send(err);
      return console.log(err);
    });
  };

  getUserById(req: Request, res: Response) {
    const {id} = req.params;

    User.findByPk(id)
    .then(user => {
      if(!user) return res.status(404).json({ message: 'Not found' });

      return res.json(user);
    })
    .catch(err => {
      res.status(500).send(err);
      return console.log(err);
    });
  };

  async createUser(req: Request, res: Response) {
    const { login, password: newPassword, age, isdeleted} = req.body;

    const password = await hashService.hashPassword(newPassword);

    User.create({login, password, age, isdeleted})
    .then(user => {      
      return res.status(201).json(user);
    })
    .catch(err => {
      res.status(400).send(err);
      return console.log(err);
    });
  };

  deleteUser(req: Request, res: Response) {
    const {id} = req.params;

    User.destroy({
      where: {id}
    })
    .then((deletedId) => {
      return res.status(204).json(deletedId);
    })
    .catch(err => {
      res.status(404).send(err);
      return console.log(err);
    });
  };

  async updateUserById(req: Request, res: Response) {
    const {id} = req.params;
    const {login, password: newPassword, age, isdeleted} = req.body;

    const password = await hashService.hashPassword(newPassword) || newPassword;

    User.update({login, password, age, isdeleted},
    {
      where: {id}
    })
    .then((updatedStatus) => {
      return res.status(204).json(updatedStatus);
    })
    .catch(err => {
      res.status(400).send(err);
      return console.log(err);
    });
  };
}

const userController = new UserController();

export default userController;

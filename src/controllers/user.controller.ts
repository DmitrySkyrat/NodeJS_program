import {Request, Response} from 'express';
import db from '../database/sequelize';
import {getAutoSuggestUsers} from '../services/user.service';
const User = db.user;

class UserController {
  static readonly DEFAULT_USERS_LIMIT = 10;
  static readonly LOGIN_SUBSTRING = '';

  async getUsers(req: Request, res: Response): Promise<any> {
    User.findAll({raw: true})
    .then(users => {
      const filteredUsers = getAutoSuggestUsers(users as any[], UserController.LOGIN_SUBSTRING, UserController.DEFAULT_USERS_LIMIT);

      return res.json(filteredUsers);
    })
    .catch(err => console.log(err));
  };

  async getUserById(req: Request, res: Response): Promise<any> {
    const id = req.params.id;

    User.findByPk(id)
    .then(user => {
      if(!user) return;

      return res.json(user);
    })
    .catch(err=>console.log(err));
  };

  async createUser(req: Request, res: Response): Promise<any> {
    const { login, password, age, isdeleted} = req.body;

    User.create({
      login: login,
      password: password,
      age: age,
      isdeleted: isdeleted
    })
    .then(value => {
      return res.status(201).json(value);
    })
    .catch(err => console.log(err));
  };

  async deleteUser(req: Request, res: Response): Promise<any> {
    const id = req.params.id;

    User.destroy({
      where: {
        id: id
      }
    })
    .then((deletedId) => {
      return res.status(204).json(deletedId);
    })
    .catch(err => console.log(err));
  };

  async updateUserById(req: Request, res: Response): Promise<any> {
    const id = req.params.id;
    const { login, password, age, isdeleted} = req.body;

    User.update({
      login: login,
      password: password,
      age: age,
      isdeleted: isdeleted
    },
    {
      where: {
        id: id
      }
    })
    .then((updatedStatus) => {
      res.json(updatedStatus);
    })
    .catch(err => console.log(err));
  };
}

const userController = new UserController();

export default userController;

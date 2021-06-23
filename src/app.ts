import express, {Application} from 'express';
import {validationErrorHandler} from './middlewares/errorHandler';
import userRouter from './routes/user.routes';
import {port} from './config/config';
import sequelize from './database/models/index';
import User from './database/models/user';
import { users } from './database/seeders/user.seeder';
import { groups } from './database/seeders/group.seeder';
import homeRoute from './routes/home.route';
import groupRouter from './routes/group.route';
import Group from './database/models/group';
import { IGroup } from './model/group';
import { IUser } from './model/users';
import userGroupsRouter from './routes/user-groups.route';
import logger from './utils/logger';
import requestData from './middlewares/requestData';
import cors from 'cors';
import loginRouter from './routes/login.route';
import authorization from './middlewares/authorization';

const app: Application = express();
const eraseDatabaseOnSync = true;
const createUsers = () => {
  users.map(async (user: IUser): Promise<void>  => {
    await User.create(user);
  });
};

const createGroups = () => {
  groups.map(async (group: IGroup): Promise<void> => {
    await Group.create(group);
  });
};

app.use(cors());
app.use(express.json());
app.use(loginRouter);
app.use(authorization);
app.use(requestData);
app.use(homeRoute);
app.use(userRouter);
app.use(groupRouter);
app.use(userGroupsRouter);
app.use(validationErrorHandler);


sequelize.sync({ force: eraseDatabaseOnSync })
.then(async() => {
  if (eraseDatabaseOnSync) {
    createUsers();
    createGroups();
  }

  app.listen(port, (): void => {
    logger.info(`Server started on port ${port}`);
  });
})
.catch(err=> logger.error(JSON.stringify(err)));

process.on('uncaughtException', (error) => {
  logger.error(JSON.stringify(error));
});

import express, {Application} from 'express';
import {validationErrorHandler} from './middlewares/errorHandler';
import router from './routes/user.routes';
import {port} from './config/config';
import sequelize from './database/models/index';
import User from './database/models/user';
import { users } from './database/seeders/user.seeder';
import homeRoute from './routes/home';

const app: Application = express();
const eraseDatabaseOnSync = false;

app.use(express.json());
app.use(homeRoute);
app.use(router);
app.use(validationErrorHandler);

sequelize.sync({ force: eraseDatabaseOnSync })
.then(async() => {
  if (eraseDatabaseOnSync) {
    createUsers();
  }

  app.listen(port, (): void => {
    console.log(`server started on port ${port}`);
  });
})
.catch(err=> console.log(err));

const createUsers = () => {
  users.map(async user => {
    await User.create(user);
  });
};

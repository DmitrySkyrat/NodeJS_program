import {databaseName, password, userName} from '../config/config';
import {Sequelize} from 'sequelize';
import userModel from '../database/user.model';
 
const sequelize = new Sequelize(databaseName, userName, password, {
  dialect: 'postgres',
  host: 'localhost'
});

const User = sequelize.define("user", userModel, {
  timestamps: false
})

export default {
  sequelize: sequelize,
  user: User
}

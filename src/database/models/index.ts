import {Sequelize} from 'sequelize';
const env = process.env.NODE_ENV || 'development';
import config from '../config/config';
const buildEnv = config[env];

let sequelize: Sequelize = new Sequelize(buildEnv.database, buildEnv.username, buildEnv.password, buildEnv);

export default sequelize;

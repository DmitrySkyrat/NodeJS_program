import { DataTypes, Model, Optional, UUIDV4 } from 'sequelize';
import Group from './group';
import sequelize from './index';
import UserGroup from './user-group';

interface UserAttributes {
  id: string;
  login: string;
  password: string;
  age: number;
  isdeleted: boolean;
};

interface UserCreateAttributes extends Optional<UserAttributes, 'id'> {};

interface UserInstance 
  extends Model<UserAttributes, UserCreateAttributes>, UserAttributes {
    createdAt?: Date;
    updatedAt?: Date;
  };

const User = sequelize.define<UserInstance>(
  'User',
  {
    id: {
      allowNull: false,
      defaultValue: UUIDV4,
      autoIncrement: false,
      primaryKey: true,
      type: DataTypes.UUID,
      unique: true
    },
    login: {
      allowNull: true,
      type: DataTypes.TEXT
    },
    password: {
      allowNull: true,
      type: DataTypes.TEXT
    },
    age: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    isdeleted: {
      allowNull: true,
      type: DataTypes.BOOLEAN
    }
  }
);

User.belongsToMany(Group, {through: UserGroup});
Group.belongsToMany(User, {through: UserGroup});

export default User;

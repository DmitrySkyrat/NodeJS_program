import { DataTypes, Model, Optional, UUIDV4 } from 'sequelize';
import sequelize from './index';

interface UserGroupAttributes {
  id: string;
  UserId: string;
  GroupId: string;
};

interface UserGroupCreateAttributes extends Optional<UserGroupAttributes, 'id'> {};

interface UserGroupInstance 
  extends Model<UserGroupAttributes, UserGroupCreateAttributes>, UserGroupAttributes {
    createdAt?: Date;
    updatedAt?: Date;
  };

const UserGroup = sequelize.define<UserGroupInstance>(
  'UserGroup',
  {
    id: {
      allowNull: false,
      defaultValue: UUIDV4,
      autoIncrement: false,
      primaryKey: true,
      type: DataTypes.UUID,
      unique: true
    },
    UserId: {
      allowNull: false,
      defaultValue: UUIDV4,
      autoIncrement: false,
      primaryKey: true,
      type: DataTypes.UUID,
      unique: true
    },
    GroupId: {
      allowNull: false,
      defaultValue: UUIDV4,
      autoIncrement: false,
      primaryKey: true,
      type: DataTypes.UUID,
      unique: true
    }
  }
);

export default UserGroup;

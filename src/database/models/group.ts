import { DataTypes, Model, Optional, UUIDV4 } from 'sequelize';
import { Permission } from '../../model/group';
import sequelize from './index';

interface GroupAttributes {
  id: string;
  name: string;
  permissions: Permission[];
};

interface GroupCreateAttributes extends Optional<GroupAttributes, 'id'> {};

interface GroupInstance
  extends Model<GroupAttributes, GroupCreateAttributes> {
    createdAt?: Date;
    updatedAt?: Date;
};

const Group = sequelize.define<GroupInstance>(
  'Group',
  {
    id: {
      allowNull: false,
      defaultValue: UUIDV4,
      autoIncrement: false,
      primaryKey: true,
      type: DataTypes.UUID,
      unique: true
    },
    name: {
      allowNull: true,
      type: DataTypes.TEXT
    },
    permissions: {
      allowNull: true,
      type: DataTypes.ARRAY(DataTypes.TEXT)
    }
  }
);

export default Group;

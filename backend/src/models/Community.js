import { DataTypes } from 'sequelize';
import { sequelize } from './index.js';

const Community = sequelize.define('Community', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  members: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    allowNull: true,
  },
});

export default Community;

import { DataTypes } from 'sequelize';
import { sequelize } from './index.js';

const Mentor = sequelize.define('Mentor', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  bio: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  expertise: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

export default Mentor;

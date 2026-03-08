import { DataTypes } from 'sequelize';
import { sequelize } from './index.js';

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('student', 'mentor', 'admin'),
    defaultValue: 'student',
  },
  profile: {
    type: DataTypes.JSONB,
    allowNull: true,
  },
});

export default User;

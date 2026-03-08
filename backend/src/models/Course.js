import { DataTypes } from 'sequelize';
import { sequelize } from './index.js';

const Course = sequelize.define('Course', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  content: {
    type: DataTypes.JSONB,
    allowNull: true,
  },
  creatorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

export default Course;

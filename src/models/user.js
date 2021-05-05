const Sequelize = require('sequelize');
const sequelize = require('../utils/connect');
const Branch = require('./branch');

const User = sequelize.define(
  'user',
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    user_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    mobile_number: {
      type: Sequelize.BIGINT,
      allowNull: false,
    },
    branch_id: {
      type: Sequelize.INTEGER,
      references: {
        model: 'branches',
        key: 'id',
      },
    },
    profile_image: {
      type: Sequelize.STRING,
      defaultValue: '',
    },
    is_admin: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    is_active: {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    },
  },
  { timestamps: true }
);

module.exports = User;

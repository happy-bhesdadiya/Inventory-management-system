const Sequelize = require('sequelize');
const sequelize = require('../utils/connect');
const User = require('./user');
const Product = require('./product');

const ProductMapping = sequelize.define('productMapping', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  issued_date: {
    type: Sequelize.DATE,
    defaultValue: null,
  },
  returned_date: {
    type: Sequelize.DATE,
    defaultValue: null,
  },
  status: {
    type: Sequelize.STRING,
    defaultValue: 'pending',
  },
});

User.hasOne(ProductMapping, { as: 'assigned_by', foriegnKey: User.id });
User.hasOne(ProductMapping, { as: 'assigned_to', foriegnKey: User.id });
Product.hasOne(ProductMapping, { foriegnKey: Product.id });

module.exports = ProductMapping;

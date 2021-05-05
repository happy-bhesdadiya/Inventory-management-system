const Sequelize = require('sequelize');
const sequelize = require('../utils/connect');

const Stock = sequelize.define(
  'stock',
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    product_name: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    available_qty: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    total_qty: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    product_image: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    price_per_product: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  { timestamps: true }
);

module.exports = Stock;

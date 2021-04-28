const Sequelize = require("sequelize");
const sequelize = require("../utils/connect");

const Product = sequelize.define("product", {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true,
	},
	product_name: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	is_available: {
		type: Sequelize.BOOLEAN,
		defaultValue: true,
	},
});

module.exports = Product;

const Sequelize=require('sequelize');
const sequelize = require('../utils/connect');

const Branch = sequelize.define('branch', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    branch_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
    }
}, { timestamps: true });

module.exports = Branch
const Sequelize=require('sequelize');
const sequelize = require('../utils/connect');
const stock=sequelize.define('stock',{
    id:{
        type:Sequelize.BIGINT,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    product_name:{
        type:Sequelize.STRING,
        allowNull:false
    },
    available_qty:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    total_qty:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    product_image:{
        type:Sequelize.STRING,
        allowNull:false
    },
    price_per_product:{
        type:Sequelize.FLOAT,
        allowNull:false
    }
})
module.exports=stock
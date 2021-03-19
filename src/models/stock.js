const Sequelize=require('sequelize');
const sequelize = require('../utils/connect');

const stock=sequelize.define('stock',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    productname:{
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
    productimage:{
        type:Sequelize.STRING,
        allowNull:false
    },
    price_per_product:{
        type:Sequelize.FLOAT,
        allowNull:false
    }
},
{
    timestamps:false
})
module.exports=stock
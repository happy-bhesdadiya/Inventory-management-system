const Sequelize=require('sequelize');
const sequelize = require('../utils/connect');

const product=sequelize.define('product',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type:Sequelize.STRING,
        allowNull:false
    },
    is_available:{
        type:Sequelize.BOOLEAN,
        defaultValue:true
    }
    },
    {
        timestamps:false
    }
)
module.exports=product
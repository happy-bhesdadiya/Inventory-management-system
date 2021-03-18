const Sequelize=require('sequelize');
const sequelize = require('../utils/connect');
const product=sequelize.define('product',{
    id:{
        type:Sequelize.UUID,
        primaryKey:true,
        defaultValue:Sequelize.UUIDV4
    },
    name: Sequelize.STRING,
    is_available:Sequelize.BOOLEAN
    },
    {
        timestamps:false
    }
)
module.exports=product
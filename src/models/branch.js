const Sequelize=require('sequelize');
const sequelize = require('../utils/connect');
const branch=sequelize.define('branch',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    branch_name:{ 
        type:Sequelize.STRING,
        allowNull:false
    },
    is_active:{
        type:Sequelize.BOOLEAN,
        defaultValue:true
        
    }
        
}
)
module.exports=branch
const Sequelize=require('sequelize');
const sequelize = require('../connect');
const branch=sequelize.define('branch',{
    id:{
        type:Sequelize.UUID,
        primaryKey:true,
        defaultValue:Sequelize.UUIDV4
    },
    branchname: Sequelize.STRING,
    is_active:{
        type:Sequelize.BOOLEAN,
        default:true
        
    }
        
},
    {
        timestamps:false
    }
)
module.exports=branch
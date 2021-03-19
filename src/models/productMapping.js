const Sequelize=require('sequelize');
const sequelize = require('../utils/connect');
const user=require('./user');
const product=require('./product');
const branch = require('./branch');
const productMapping=sequelize.define('productMapping',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
   issued_date:{
    type: Sequelize.DATE,
    defaultValue:null
   },
   returned_date:{
    type: Sequelize.DATE,
    defaultValue:null
   }  ,
   status:{
       type:Sequelize.STRING,
       defaultValue:"pending"
    }
})

user.hasOne(productMapping,{as:'assigned_by',foriegnKey:user.id})
user.hasOne(productMapping,{as:'assigned_to',foriegnKey:user.id})
product.hasOne(productMapping,{foriegnKey:product.id})
module.exports=productMapping
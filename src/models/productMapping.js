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
    type: DATE,
    allowNull: true
   },
   returned_date:{
    type: DATE,
    defaultValue:null
   }  ,
   status:{
       type:Sequelize.STRING,
       defaultValue:"pending"
    }
},
{
    timestamps:false
})

user.hasOne(productMapping,{foriegnKey:user.id})
branch.hasOne(productMapping,{foriegnKey:branch.id})
product.hasOne(productMapping,{foriegnKey:product.id})
module.exports=productMapping
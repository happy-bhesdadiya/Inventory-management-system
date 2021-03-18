const Sequelize=require('sequelize');
const sequelize = require('../connect');
const user=require('./user');
const product=require('./product');
const branch = require('./branch');
const productMapping=sequelize.define('productMapping',{
    id:{
        type:Sequelize.UUID,
        primaryKey:true,
        defaultValue:Sequelize.UUIDV4
    },
   issued_date:{
    type: 'TIMESTAMP',
    allowNull: true
   },
   returned_date:{
    type: 'TIMESTAMP',
    allowNull: true
   }  ,
   status:Sequelize.STRING
},
{
    timestamps:false
})

user.hasOne(productMapping,{foriegnKey:user.id})
branch.hasOne(productMapping,{foriegnKey:branch.id})
product.hasOne(productMapping,{foriegnKey:product.id})
module.exports=productMapping
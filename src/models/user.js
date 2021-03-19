const Sequelize=require('sequelize');
const sequelize = require('../utils/connect');
const branch=require('./branch')
const user=sequelize.define('user',{
  id:{
    type:Sequelize.BIGINT,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  user_name: {
    type:Sequelize.STRING,
    allowNull:false
  },
  profile_image: {
    
    type:Sequelize.STRING,
    allowNull:false
  },
  email: {
    type:Sequelize.STRING,
    allowNull:false
  },
  password: {
    type:Sequelize.STRING,
    allowNull:false
  },
  is_admin: {
      type:Sequelize.BOOLEAN,
      defaultValue:false
  },
  is_active:{
    type:Sequelize.BOOLEAN,
    defaultValue:true
  },
  token: {
    type:Sequelize.STRING,
    allowNull:false
  }

    

})

branch.hasOne(user,{foreignKey:branch.id})
module.exports=user
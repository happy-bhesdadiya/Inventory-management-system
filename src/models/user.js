<<<<<<< HEAD
const Sequelize=require('sequelize');
const sequelize = require('../utils/connect');
const branch=require('./branch')
const user=sequelize.define('user',{
  id:{
    type:Sequelize.INTEGER,
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
    allowNull:false,
    unique:true
  },
  password: {
    type:Sequelize.STRING,
    allowNull:false,
    minlength:8
    
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
  },
  created_at: {
    type: 'TIMESTAMP',
    defaultValue:  Sequelize.NOW,
    allowNull: false
  },
  updated_at: {
    type: 'TIMESTAMP',
    defaultValue:  Sequelize.NOW,
    allowNull: false
  },
  branch_id: {
    type: Sequelize.INTEGER,
    references: {
       model: 'branch',
       key: 'id', 
    }
 } 

},{timestamps:false})

module.exports=user
=======
const Sequelize = require("sequelize");
const sequelize = require("../utils/connect");
const Branch = require("./branch");

const User = sequelize.define(
    "user",
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        user_name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        mobile_number: {
            type: Sequelize.BIGINT,
            allowNull: false,
        },
        branch_id: {
            type: Sequelize.INTEGER,
            references: {
                model: "branches",
                key: "id",
            },
        },
        profile_pic: {
            type: Sequelize.STRING,
            defaultValue: "",
        },
        is_admin: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
        },
        is_active: {
            type: Sequelize.BOOLEAN,
            defaultValue: true,
        },
    },
    { timestamps: true }
);

module.exports = User;
>>>>>>> 7b35f4724ff2ec45d13eedab202c1c1b4dec06c2

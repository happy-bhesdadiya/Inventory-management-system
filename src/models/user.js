const Sequelize=require('sequelize');
const sequelize = require('../utils/connect');
const branch=require('./branch')
const user=sequelize.define('user',{
    id:{
        type:Sequelize.UUID,
        primaryKey:true,
        defaultValue:Sequelize.UUIDV4
    },
    username: Sequelize.STRING,
    profile_image:Sequelize.STRING,
     email:Sequelize.STRING,
      password:Sequelize.STRING,
        is_admin: {
            type:Sequelize.BOOLEAN,
        default:false},
     is_active:{type:Sequelize.BOOLEAN,
    default:true},
        token:Sequelize.STRING,
     created_at: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
      },
      updated_at: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
      }
    
},{
  timestamps:false
})

branch.hasOne(user,{foreignKey:branch.id})
module.exports=user
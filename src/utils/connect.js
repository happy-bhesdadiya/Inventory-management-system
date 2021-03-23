const { Sequelize } = require('sequelize');
require('dotenv').config({path:'../credentials.env'})

const sequelize = new Sequelize('inventory',"root","4699", {
  host: 'localhost',
  dialect: 'mysql',
  logging:false,
  pool: {
    max: 15,
    min: 5,
    idle: 10000,
    evict: 15000,
    acquire: 30000
  }
});
module.exports=sequelize;
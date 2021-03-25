const { Sequelize } = require('sequelize');
<<<<<<< HEAD
require('dotenv').config({path:'../credentials.env'})

const sequelize = new Sequelize('inventory',"root","4699", {
=======
require('dotenv').config();

const sequelize = new Sequelize('inventory', process.env.DB_USER, process.env.DB_PASSWORD, {
>>>>>>> 7b35f4724ff2ec45d13eedab202c1c1b4dec06c2
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
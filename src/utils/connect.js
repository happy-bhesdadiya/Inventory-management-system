const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('inventory', process.env.DB_NAME, process.env.DB_PASSWORD, {
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
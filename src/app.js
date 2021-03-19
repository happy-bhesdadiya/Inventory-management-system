var express = require('express');
require('dotenv').config({path:'./credentials.env'})
var sequelize= require('./utils/connect');
var Sequelize= require('sequelize');
// var branch_details = require('./models/branch');
// var product_details = require('./models/product');
// var product_mapping_details = require('./models/productMapping');
// var stock_details = require('./models/stock');
// var user_details = require('./models/user');
var app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}))
sequelize
        .authenticate()
        .then(() => {
            console.log('Connection has been established successfully.');
        })

sequelize
.sync()
.then(result=>{
  //  console.log(result)
    app.listen(3000)
})        
.catch(err=>{
    console.log(err)
})

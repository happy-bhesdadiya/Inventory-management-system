var express = require('express');
require('dotenv').config({path:'./credentials.env'})
var sequelize= require('./src/utils/connect');
var Sequelize= require('sequelize');
var branch_details = require('./src/models/branch');
var product_details = require('./src/models/product');
var product_mapping_details = require('./src/models/productMapping');
var stock_details = require('./src/models/stock');
var user_details = require('./src/models/user');
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

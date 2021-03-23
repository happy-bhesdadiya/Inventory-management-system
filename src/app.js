var express = require('express');
require('dotenv').config({path:'./credentials.env'})
var sequelize= require('./utils/connect');
const bodyParser=require('body-parser')
var Sequelize= require('sequelize');
// var branch_details = require('./models/branch');
// var product_details = require('./models/product');
// var product_mapping_details = require('./models/productMapping');
// var stock_details = require('./models/stock');
// var user_details = require('./models/user');
var adminRoutes=require('./routes/adminRoutes')
var employeeRoutes=require('./routes/employeeRoutes')

var app = express();

//app.use(express.json());
//app.use(express.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))

//app.use('/admin',adminRoutes)

app.use('/employee',employeeRoutes)

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

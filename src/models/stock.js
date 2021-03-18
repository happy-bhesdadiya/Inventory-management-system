const Sequelize=require('sequelize');
const sequelize = require('../connect');
const stock=sequelize.define('stock',{
    id:{
        type:Sequelize.UUID,
        primaryKey:true,
        defaultValue:Sequelize.UUIDV4
    },
    productname: Sequelize.STRING,
    available_qty:Sequelize.INTEGER,
    total_qty:Sequelize.INTEGER,
    product_image:Sequelize.STRING,
    price_per_product:Sequelize.INTEGER
},
{
    timestamps:false
})
module.exports=stock
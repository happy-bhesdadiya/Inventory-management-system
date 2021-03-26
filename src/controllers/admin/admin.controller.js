
const User = require("../../models/user");

const Stock = require("../../models/stock")

const getUsers = async(req,res)=>{
    try{
        let admin = await User.findOne({where:{"id":req.body.id}})
        if(admin.is_admin===true)
        {
             let users = await User.findAll({where:{"is_active":"1"}})
             res.status(200).send(users)
        }
        else
        {
            res.send("only admin can see this")
        }
    }
    catch(e)
    {
        res.status(400).send(e)
    }
}

const updateUser =async(req,res)=>{
    try{
        let admin = await User.findOne({where:{"id":req.body.admin_id}})
        if(admin.is_admin===true)
        {
            // let array=['user_name','profile_image','email','password','is_admin','is_active']
            const { user_name,profile_image,email,password,is_admin,is_active } = req.body;

            await User.update({user_name,profile_image,email,password,is_admin,is_active},{where:{'id':req.body.user_id}})
            .then(res.status(200).send("data is upadated"))
        }
        else
        {
            res.send("only admin can see this")
        }
    }
    catch(e)
    {
        res.status(400).send(e);
    }
}

const getRemovedUsers = async(req,res)=>{
    try{
        let admin = await User.findOne({where:{"id":req.body.id}})
        if(admin.is_admin===true)
        {
             let users = await User.findAll({where:{"is_active":"0"}})
             res.status(200).send(users)
        }
        else
        {
            res.send("only admin can see this")
        }
    }
    catch(e)
    {
        res.status(400).send(e)
    }
}

const removeStock = async(req,res)=>{
    try{
        let admin = await User.findOne({where:{"id":req.body.admin_id}})
        if(admin.is_admin===true)
        {
             let stock = await Stock.findOne({where:{"id":req.body.stock_id}})
             if(stock)
             {
                 stock.status="0"
                 await stock.save();
                 res.status(200).send(stock)
             }
            
        }
        else
        {
            res.send("only admin can see this")
        }
    }
    catch(e)
    {
        res.status(400).send(e)
    }
       
}
module.exports = {getUsers,updateUser,getRemovedUsers,removeStock}
const express=require('express')
const router=new express.Router()
const User = require('../models/user')

const bcrypt=require('bcryptjs')
const {getUsers,updateUser,getRemovedUsers,removeStock} = require("../controllers/admin/admin.controller")

router.get("/getUsers",getUsers)

router.post("/updateUser",updateUser)

router.get("/getRemovedUsers",getRemovedUsers)

router.post("/removeStock",removeStock)


module.exports=router
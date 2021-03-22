const express=require('express')
const router=new express.Router()
const User = require('../models/user')
const { generateAccessToken, authenticateJWT}=require('../utils/middleware/authentication')
const bcrypt=require('bcryptjs')

router.post("/signUp",async(req,res)=>{
    var password=req.body.password
        if(password.length>=8)
        {
            const salt = await  bcrypt.genSalt(10);
            // now we set user password to hashed password
            password =  await bcrypt.hash(password, salt);
        }
        else{
            res.status(406).send("password must be in 8 character")
        }
        var token=await generateAccessToken({email:req.body.email})
    
    const data=await User.create({
        user_name:req.body.user_name,
        email:req.body.email,
        password,
        mobile_number:req.body.mobile_number,
        branch_id:req.body.branch_id,
        profile_image:req.body.profile_image,
        is_admin:req.body.is_admin,
        token
      }) .then((data) => {
        res.json({
          is_error: false,
          message: "user added successfully!",
          data
        });
  
        console.log("user added successfully!!");
        return res.status(201).send();
      })
      .catch((err) => {
        var error = {
          is_error: true,
          message: err,
        };
        console.log(error);
        return res.status(500).send(error);
      });
  
})

router.post("/login",authenticateJWT,async(req,res)=>{
    console.log("0")
    const user = await User.findOne({where:{ email:req.body.email }});
    if (user) {
        console.log("1");
      // check user password with hashed password stored in the database
      const validPassword = await bcrypt.compare(req.body.password, user.password);
      if (validPassword) {
          console.log("2");
        return res.status(200).send();
      } else {
        res.status(400).json({ error: "Invalid Password" });
      }
    }
    
    else {
      res.status(401).json({ error: "User does not exist" });
    }
})


module.exports=router
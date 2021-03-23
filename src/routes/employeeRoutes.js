const express=require('express')
const router=new express.Router()
const User = require('../models/user')
const product=require('../models/product')
const productMapping=require('../models/productMapping')

const { generateAccessToken, authenticateJWT}=require('../utils/middleware/authentication')
const bcrypt=require('bcryptjs')


//---- employee registration
router.post("/signUp",async(req,res)=>{
    var password=req.body.password
    var token=await generateAccessToken({email:req.body.email})
  
        if(password.length>=8)
        {
            //const salt = await  bcrypt.genSalt(10);
            // now we set user password to hashed password
            password =  await bcrypt.hash(req.body.password, 10);
            console.log(password)
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
        
        }
        else{
            res.status(406).send(new Error({message:"password length must be atleast 8 character."}))
        }
    
   
})

//------- employee login

router.post("/login",authenticateJWT,async(req,res)=>{
    
    const user = await User.findOne({where:{ email:req.body.email }});
    
    if (user) {
         console.log(user.password);
      // check user password with hashed password stored in the database
      const validPassword = await bcrypt.compare(req.body.password, user.password);
      if (validPassword) {
        return res.status(200).send();
      } else {
        res.status(400).json({ error: "Invalid Password" });
      }
    }
    
    else {
      res.status(401).json({ error: "User does not exist" });
    }
})

//-----get status of single request

router.post('/getRequest',authenticateJWT,async(req,res)=>{
       const data=await productMapping.findOne({attributes:['status','product_id','assigned_by'], where:{assigned_to:req.body.id}})
             
           var product_id=data.dataValues.product_id 
           var status= data.dataValues.status
  const result=await product.findOne({attributes:['product_name'], where:{id:data.dataValues.product_id}})
  try{
  if(status==='pending'){
    return  res.json({
        is_error: false,
         send:{ status,
            product_id,
            result
          }
     })
  }
      return res.json({
        is_error: false,
        send:{ 
            data,
           result
        }
      })
    }
    catch(err){
        var error = {
                        is_error: true,
                        message: err,
                      };
                      console.log(error);
                      return res.status(500).send(error);
                    
    }
})


//----get status of all requests
router.post('/getRequests',authenticateJWT,async(req,res)=>{
  const data=await productMapping.findAll({attributes:['status','product_id','assigned_by'], where:{assigned_to:req.body.id}})
  .then((data)=>{
  data.forEach(async(element)=>{
      var product_id=element.dataValues.product_id
      var status=element.dataValues.status
     const  result=await product.findOne({attributes:['product_name'], where:{id:product_id}})
      
                          if(status==='pending'){
                            res.json({
                              is_error: false,
                              send:{ status,
                                  product_id,
                                  result
                              }
                          })
                          }
                       return  res.send({data,result})
                          //  return res.json({
                          //     is_error: false,
                          //     send:{ 
                          //         data,
                          //         result
                          //     }
                          // })
                        
                 
      })
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


//-----employee logout

router.post('/logout',authenticateJWT,async(req,res)=>{
    
    const result=await User.update({token:"",is_active:0},{where:{id:req.body.id}})
     
    const data=await User.findOne({attributes:['user_name','profile_image','branch_id','email','is_admin','is_active','token'],  where:{id:req.body.id}})
     .then((data) => {
        res.json({
          is_error: false,
          message: "user logout!",
          data
        });
        return res.status(200).send();
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


module.exports=router
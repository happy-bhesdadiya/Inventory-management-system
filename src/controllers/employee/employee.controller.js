require("dotenv").config();
const errorFunction = require("./../../utils/errorFunction");
const User = require("./../../models/user");
const productMapping=require("./../../models/productMapping")
const emailRegEx = RegExp(/^[a-zA-Z0-9._]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
const { securePassword } = require("../../utils/securePassword");
const { tokenGeneration } = require("../../utils/jwtTokens");
const Cryptr = require("cryptr");
const getUserFromSession = require("../../utils/getUser");
const cryptr = new Cryptr(process.env.SECRET_KEY);

const sevenDays = 7 * 24 * 60 * 60 * 1000;

const employeeLogin = async (req, res, next) => {
     try {
          const { email, password, is_admin } = req.body;
          if (emailRegEx.test(email) && password.length > 8) {
               const employee = await User.findOne({ where: { email: email, is_admin: is_admin } });
               if (employee) {
                    const tokenOriginal = await tokenGeneration({ id: employee.id });
                    const token = cryptr.encrypt(tokenOriginal);

                    res.cookie("access-token", token, {
                         maxAge: sevenDays,
                         httpOnly: true,
                         secure: false,
                         path: "/",
                         sameSite: "none",
                    });
                    res.status(202);
                    return res.json(errorFunction(false, "Employee Logged In Successfully", { employee, token }));
               } else {
                    res.status(404);
                    return res.json(errorFunction(true, "Employee Not Found"));
               }
          } else {
               res.status(404);
               return res.json(errorFunction(true, "Employee Not Found"));
          }
     } catch (error) {
          res.status(501);
          return res.json(errorFunction(true, "Something Went Wrong"));
     }
}

const employeeSignUp = async (req, res, next) => {
     try {
          const { email } = req.body;
          if (emailRegEx.test(email)) {
               const existingEmployee = await User.findOne({ where: { email: email } });
               if (existingEmployee) {
                    res.status(403);
                    return res.json(errorFunction(true, "Employee Already Exists"));
               } else {
                    const hashedPassword = await securePassword(req.body.password);
                    const newEmployee = await User.create({
                        user_name: req.body.name,
                        email: req.body.email,
                        password: hashedPassword,
                        mobile_number: req.body.mobile_number,
                        branch_id: req.body.branch_id,
                        is_active: req.body.is_active,
                        is_admin: req.body.is_admin,
                        profile_image:req.body.profile_image
                    });
                    if (newEmployee) {
                         const tokenOriginal = await tokenGeneration({ id: newEmployee.id });
                         const token = cryptr.encrypt(tokenOriginal);

                         res.cookie("access-token", token, {
                              maxAge: sevenDays,
                              httpOnly: true,
                              secure: false,
                              path: "/",
                              sameSite: "none",
                         });
                         res.status(201);
                         return res.json(errorFunction(false, "Employee Added Successfully", { newEmployee, token }));
                    } else {
                         res.status(400);
                         return res.json(errorFunction(true, "Error Adding Employee"));
                    }
               }
          } else {
               res.status(400);
               return res.json(errorFunction(true, "Error Adding Employee"));
          }
     } catch (error) {
          res.status(501);
          console.log("Error Adding Employee : ", error);
          return res.json(errorFunction(true, "Something Went Wrong", error));
     }
}

const employeeGetRequests= async (req,res,next)=>{
     const data=await productMapping.findAll({attributes:['status','product_id','assigned_by'], where:{assigned_to:req.body.id}})
     .then((data)=>{
     data.forEach(async(element)=>{
         var product_id=element.dataValues.product_id
         var status=element.dataValues.status
        const  result=await product.findOne({attributes:['product_name'], where:{id:product_id}})
         
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
}

const employeeLogout=async(req,res,next)=>{

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

}

const employeeViewProfile = async (req, res, next) => {
     try {
          const employee = await getUserFromSession(req, res);
          if (employee) {
               res.status(200);
               return res.json(errorFunction(false, "Showing Employee Details", employee));
          } else {
               res.status(404);
               return res.json(errorFunction(true, "Unauthenticated Employee"));
          }
     } catch (error) {
          res.status(501);
          return res.json(errorFunction(true, "Something Went Wrong", error));
     }
}



const updateProfile=async(req,res,next)=>{
     try{
          console.log("Inside Update Profile")
          const employee=await getUserFromSession(req,res);
          console.log(employee.email);
          const existingEmployee = await User.findOne({ where: { email: employee.email } });
          if(!existingEmployee)
          {
               res.status(404);
                    return res.json(errorFunction(true, "Employee Not Found"));
          }
          const hashedPassword = await securePassword(req.body.password);
          const c1= await User.update({user_name:req.body.name,mobile_number:req.body.mobile_number,password:hashedPassword,branch_id:req.body.branch_id,profile_pic:req.body.profile_pic,is_admin:req.body.is_admin,is_active:req.body.is_active},{where:{
              email:req.body.email
           }})
           if(c1[0]===1)
           {
               res.status(200);
               const emp = await User.findOne({ where: { email: employee.email } });
               return res.json(errorFunction(false, "Employee Data Updated Succesfully",emp));
           }
           else{
               res.status(404);
               return res.json(errorFunction(true, "Employee Data  Not Updated "));
               
           } 

     }
     catch(e)
     {
          res.status(501);
          return res.json(errorFunction(true,"Something went wrong",e))
     }
}

module.exports = {
     employeeLogin, employeeSignUp, employeeViewProfile,updateProfile,employeeGetRequests,employeeLogout
}
const Joi = require("joi");
const errorFunction = require("../../utils/errorFunction");

const validation = Joi.object({
     user_name: Joi.string().required().trim(true),
     email: Joi.string().required().trim(true),
     profile_image: Joi.string().default(""),
     mobile: Joi.number().max(9999999999).min(6666666666).required(),
     password: Joi.string().min(7).required().trim(true),
     is_admin: Joi.boolean().default(false),
     is_active: Joi.boolean().default(true),
     branch_id: Joi.number().required()
});

const employeeValidation = (req, res, next) => {
     const incomingData = {
          user_name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          branch_id: req.body.branch_id,
          mobile: req.body.mobile,
          profile_image: req.body.profile_image,
          is_admin: req.body.is_admin,
          is_active: req.body.is_active
     };
     const { error } = validation.validate(incomingData);
     if (error) {
          res.status(406);
          console.log("Error in User Data : ", error);
          return res.json(errorFunction(true, "Error in User Data", error));
     } else {
          next();
     }
}

module.exports = employeeValidation;
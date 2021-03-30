const Joi = require("joi");
const errorFunction = require("../../utils/errorFunction");
const validation = Joi.object({
     user_name: Joi.string().required().trim(true),
     email: Joi.string().required().trim(true),
     password: Joi.string().min(7).required().trim(true),
     mobile_number: Joi.number().max(9999999999).min(6666666666).required(),
     branch_id: Joi.number().required(),
     profile_image: Joi.string().default(""),
     is_admin: Joi.boolean().default(false),
     is_active: Joi.boolean().default(true),
});
const adminValidation = (req, res, next) => {
    const incomingData = {
         user_name: req.body.name,
         email: req.body.email,
         password: req.body.password,
         mobile_number: req.body.mobile_number,
         branch_id: req.body.branch_id,
         profile_image: req.body.profile_image,
         is_admin: req.body.is_admin,
         is_active: req.body.is_active
    };
    const { error } = validation.validate(incomingData);
    if (error) {
         res.status(406);
         console.log("Error in Admin Data : ", error);
         return res.json(errorFunction(true, "Error in Admin Data", error));
    } else {
         next();
    }
}

module.exports = adminValidation;
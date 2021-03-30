const express = require("express");
const { updateProfile,addAdmin} = require("./../controllers/admin/admin.controller");
const employeeValidation = require("./../controllers/admin/admin.validator");
const authenticate = require("./../utils/authentication");

const router = express.Router();
router.post("/updateProfile",authenticate,employeeValidation,updateProfile)
router.post("/addAdmin",authenticate,employeeValidation,addAdmin)
module.exports = router;
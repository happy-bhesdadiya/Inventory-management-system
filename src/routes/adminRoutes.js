const express = require("express");
const { updateProfile} = require("./../controllers/admin/admin.controller");
const employeeValidation = require("./../controllers/admin/admin.validator");
const authenticate = require("./../utils/authentication");

const router = express.Router();
router.post("/updateProfile",authenticate,employeeValidation,updateProfile)
module.exports = router;
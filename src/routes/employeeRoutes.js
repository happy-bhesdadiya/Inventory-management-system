const express = require("express");
const { employeeLogin, employeeSignUp, employeeViewProfile,updateProfile,employeeGetRequests,employeeLogout } = require("./../controllers/employee/employee.controller");
const employeeValidation = require("./../controllers/employee/employee.validator");
const authenticate = require("./../utils/authentication");

const router = express.Router();

router.post("/login", employeeLogin);

router.post("/signup", employeeValidation, employeeSignUp);

router.get("/viewProfile", authenticate, employeeViewProfile);

router.post("/updateProfile",authenticate,employeeValidation,updateProfile)

router.post("/getRequests",authenticate,employeeValidation,employeeGetRequests)

router.post("/logout",authenticate,employeeValidation,employeeLogout)



module.exports = router;

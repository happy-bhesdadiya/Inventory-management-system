const express = require("express");
const { adminLogin } = require("./../controllers/admin/admin.controller");
const adminValidation = require("./../controllers/admin/admin.validator");
const authenticate = require("./../utils/authentication");

const router = express.Router();

router.post("/login", adminLogin);


module.exports = router;

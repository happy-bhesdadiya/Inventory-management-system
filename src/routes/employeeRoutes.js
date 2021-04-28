const express = require('express');
const {
  employeeLogin,
  employeeSignUp,
  employeeViewProfile,
  aquireProduct,
  updateEmployeeProfile,
  employeeGetRequests,
  employeeLogout,
} = require('./../controllers/employee/employee.controller');
const employeeValidation = require('./../controllers/employee/employee.validator');
const {getStock}=require('./../controllers/product/product.controller')
const authenticate = require('./../utils/authentication');

const router = express.Router();

router.post('/login', employeeLogin);
router.get('/getAllStock',authenticate,getStock)
router.get('/getMyRequests',authenticate,employeeGetRequests)
router.post('/signup', employeeValidation, employeeSignUp);

router.get('/viewProfile', authenticate, employeeViewProfile);
router.post('/aquireProduct', aquireProduct);
router.post(
  '/updateProfile',
  authenticate,
  employeeValidation,
  updateEmployeeProfile
);
router.post('/getRequests', authenticate, employeeGetRequests);

router.post('/logout', authenticate, employeeLogout);
module.exports = router;

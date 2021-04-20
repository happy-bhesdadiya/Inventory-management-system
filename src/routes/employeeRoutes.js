const express = require('express');
const {
  employeeLogin,
  employeeSignUp,
  employeeViewProfile,
  aquireProduct,
  updateEmployeeProfile,
  getMyAllRequest,
  employeeLogout,
  getAllStock
} = require('./../controllers/employee/employee.controller');
const employeeValidation = require('./../controllers/employee/employee.validator');
const authenticate = require('./../utils/authentication');

const router = express.Router();

router.post('/login', employeeLogin);

router.post('/signup', employeeValidation, employeeSignUp);

router.get('/viewProfile', authenticate, employeeViewProfile);
router.post('/aquireProduct', aquireProduct);
router.post(
  '/updateProfile',
  authenticate,
  employeeValidation,
  updateEmployeeProfile
);
router.get('/getMyRequests', authenticate, getMyAllRequest);

router.get('/getAllStock', authenticate, getAllStock);

router.post('/logout', authenticate, employeeLogout);
module.exports = router;

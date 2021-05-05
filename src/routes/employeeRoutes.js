const express = require('express');
const { getAllStock } = require('../controllers/product/product.controller');
const {
  employeeLogin,
  employeeSignUp,
  employeeViewProfile,
  aquireProduct,
  employeeLogout,
  employeeUpdateProfile,
  getMyAllRequest,
} = require('./../controllers/employee/employee.controller');
const employeeValidation = require('./../controllers/employee/employee.validator');
const authenticate = require('./../utils/authentication');

const router = express.Router();

router.post('/login', employeeLogin);
router.get('/getAllStock', authenticate, getAllStock);
router.get('/getMyRequests', authenticate, getMyAllRequest);
router.post('/signup', employeeValidation, employeeSignUp);

router.get('/viewProfile', authenticate, employeeViewProfile);
router.post('/aquireProduct', aquireProduct);
router.post(
  '/updateProfile',
  authenticate,
  employeeValidation,
  employeeUpdateProfile
);
// router.post('/getRequests', authenticate, employeeGetRequests);

router.post('/logout', authenticate, employeeLogout);
module.exports = router;

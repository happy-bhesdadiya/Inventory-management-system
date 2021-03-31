const express = require('express');
const {
  updateProfile,
  addAdmin,
  getUsers,
  updateUser,
  getRemovedUsers,
  removeStock,
} = require('./../controllers/admin/admin.controller');
const employeeValidation = require('./../controllers/admin/admin.validator');
const authenticate = require('./../utils/authentication');

const router = express.Router();
router.post('/updateProfile', authenticate, employeeValidation, updateProfile);
router.post('/addAdmin', authenticate, employeeValidation, addAdmin);
router.get('/getUsers', getUsers);

router.post('/updateUser', updateUser);

router.get('/getRemovedUsers', getRemovedUsers);

router.post('/removeStock', removeStock);
module.exports = router;

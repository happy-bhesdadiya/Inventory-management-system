const express = require('express');
const {
  updateProfile,
  addAdmin,
  getUsers,
  updateUser,
  getRemovedUsers,
  removeStock,
  addStock
} = require('./../controllers/admin/admin.controller');
//const adminValidation = require('./../controllers/admin/admin.validator');
const {adminValidation,
  stockValidation}=require('./../controllers/admin/admin.validator')
//const stockValidation = require('./../controllers/admin/admin.validator');
const authenticate = require('./../utils/authentication');

const router = express.Router();
router.post('/updateProfile', authenticate, adminValidation, updateProfile);
router.post('/addAdmin', authenticate, adminValidation, addAdmin);
router.post('/addStock', authenticate,stockValidation,addStock);
router.get('/getUsers', getUsers);

router.post('/updateUser', updateUser);

router.get('/getRemovedUsers', getRemovedUsers);

router.post('/removeStock', removeStock);
module.exports = router;

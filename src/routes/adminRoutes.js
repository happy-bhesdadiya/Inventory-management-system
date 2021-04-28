const express = require('express');
const {
  updateProfile,
  addAdmin,
  getUsers,
  updateUser,
  getRemovedUsers,
  removeStock,
  updateStock,
  addStock,
  viewRequests,
  resRequests,
  acceptedRequests,
  rejectedRequests,
  getAllProducts,
  getProductById,
  getAdmin
} = require('./../controllers/admin/admin.controller');
//const adminValidation = require('./../controllers/admin/admin.validator');
const {
  adminValidation,
  stockValidation,
} = require('./../controllers/admin/admin.validator');
//const stockValidation = require('./../controllers/admin/admin.validator');
const authenticate = require('./../utils/authentication');

const router = express.Router();
router.post('/updateProfile', authenticate, adminValidation, updateProfile);
router.post('/addAdmin', authenticate, adminValidation, addAdmin);
router.post('/addStock', authenticate, stockValidation, addStock);
router.post('/updateStock', authenticate, stockValidation, updateStock);
router.post('/addStock', authenticate, stockValidation, addStock);
router.get('/getUsers', getUsers);
router.get('/getAdmin', getAdmin);
router.get('/acceptedReqs', acceptedRequests);
router.get('/rejectedReqs', rejectedRequests);
router.post('/updateStock', updateStock);
router.post('/updateUser', updateUser);
router.post('/respondReq', authenticate, resRequests);
router.get('/getRemovedUsers', getRemovedUsers);
router.get('/viewReqs', authenticate, viewRequests);
router.post('/removeStock', removeStock);
router.get('/geProducts', getAllProducts);
router.get('/getProduct/:id', authenticate, getProductById);

module.exports = router;

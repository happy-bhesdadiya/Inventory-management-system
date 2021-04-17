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
router.get('/getUsers', authenticate, getUsers);
router.get('/acceptedReqs', authenticate, acceptedRequests);
router.get('/rejectedReqs', authenticate, rejectedRequests);
router.post('/updateStock', updateStock);
router.post('/updateUser', updateUser);
router.post('/respondReq', authenticate, resRequests);
router.get('/getRemovedUsers', authenticate, getRemovedUsers);
router.get('/viewReqs', authenticate, viewRequests);
router.post('/removeStock', removeStock);
router.get('/geProducts', authenticate, getAllProducts);
router.get('/getProduct/:id', authenticate, getProductById);

module.exports = router;

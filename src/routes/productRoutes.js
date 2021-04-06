const express = require('express');
const router = express.Router();
const authenticate = require('./../utils/authentication');

const {
  getStock,
  getStockId,
} = require('../controllers/product/product.controller');

router.get('/getStock', authenticate, getStock);

router.get('/getStock/:id', authenticate, getStockId);

module.exports = router;

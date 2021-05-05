const express = require('express');
const employeeRoutes = require('./employeeRoutes');
const adminRoutes = require('./adminRoutes');

const {
  defaultController,
  authenticationController,
} = require('./../controllers/defaultController');
const authentication = require('./../utils/authentication');

const router = express.Router();

router.use('/user', employeeRoutes);

router.use('/admin', adminRoutes);

router.get('/authenticate', authentication, authenticationController);

router.get('/', defaultController);

module.exports = router;

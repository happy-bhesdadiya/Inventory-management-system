require('dotenv').config();
const errorFunction = require('./../../utils/errorFunction');
const User = require('./../../models/user');
const Stock = require('./../../models/stock');
const Product = require('./../../models/product');
const ProductMapping = require('./../../models/productMapping');
const emailRegEx = RegExp(/^[a-zA-Z0-9._]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
const { securePassword } = require('../../utils/securePassword');
const { tokenGeneration } = require('../../utils/jwtTokens');
const Cryptr = require('cryptr');
const getUserFromSession = require('../../utils/getUser');
const { Sequelize } = require('../../utils/connect');
const cryptr = new Cryptr(process.env.SECRET_KEY);

const sevenDays = 7 * 24 * 60 * 60 * 1000;

const updateProfile = async (req, res, next) => {
  try {
    console.log('Inside Admin Update Profile');
    const admin = await getUserFromSession(req, res);
    console.log(admin.email);
    const existingAdmin = await User.findOne({ where: { email: admin.email } });
    if (!existingAdmin) {
      res.status(404);
      return res.json(errorFunction(true, 'Admin Not Found'));
    }
    const hashedPassword = await securePassword(req.body.password);
    const c1 = await User.update(
      {
        user_name: req.body.name,
        mobile_number: req.body.mobile_number,
        password: hashedPassword,
        branch_id: req.body.branch_id,
        profile_pic: req.body.profile_pic,
        is_admin: req.body.is_admin,
        is_active: req.body.is_active,
      },
      {
        where: {
          email: req.body.email,
        },
      }
    );
    if (c1[0] === 1) {
      res.status(200);
      const emp = await User.findOne({ where: { email: admin.email } });
      return res.json(
        errorFunction(false, 'Admin Data Updated Succesfully', emp)
      );
    } else {
      res.status(404);
      return res.json(errorFunction(true, 'Admin Data  Not Updated '));
    }
  } catch (error) {
    res.status(501);
    return res.json(errorFunction(true, 'Something Went Wrong'));
  }
};

const addAdmin = async (req, res, next) => {
  try {
    console.log('Inside Add Admin  Profile');
    const admin = await getUserFromSession(req, res);
    console.log(admin.id);
    const existingAdmin = await User.findOne({
      where: { id: admin.id, is_admin: true },
    });
    if (!existingAdmin) {
      res.status(404);
      return res.json(
        errorFunction(true, 'Only Admin Have Rights To Add Another Admin')
      );
    }
    const hashedPassword = await securePassword(req.body.password);
    const newEmployee = await User.create({
      user_name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      mobile_number: req.body.mobile_number,
      branch_id: req.body.branch_id,
      profile_pic: req.body.profile_pic,
      is_active: 1,
      is_admin: true,
    });
    if (newEmployee) {
      res.status(201);
      return res.json(
        errorFunction(false, 'Admin Added Successfully', { newEmployee })
      );
    } else {
      res.status(404);
      return res.json(errorFunction(true, 'Add Admin Failed  '));
    }
  } catch (error) {
    res.status(501);
    return res.json(errorFunction(true, 'Something Went Wrong'));
  }
};
const getUsers = async (req, res) => {
  try {
    let admin = await User.findOne({ where: { id: req.body.id } });
    if (admin.is_admin === true) {
      let users = await User.findAll({ where: { is_active: '1' } });
      res.status(200).send(users);
    } else {
      res.send('only admin can see this');
    }
  } catch (e) {
    res.status(400).send(e);
  }
};

const updateUser = async (req, res) => {
  try {
    let admin = await User.findOne({ where: { id: req.body.admin_id } });
    if (admin.is_admin === true) {
      // let array=['user_name','profile_image','email','password','is_admin','is_active']
      const {
        user_name,
        profile_image,
        email,
        password,
        is_admin,
        is_active,
      } = req.body;

      await User.update(
        { user_name, profile_image, email, password, is_admin, is_active },
        { where: { id: req.body.user_id } }
      ).then(res.status(200).send('data is upadated'));
    } else {
      res.send('only admin can see this');
    }
  } catch (e) {
    res.status(400).send(e);
  }
};

const getRemovedUsers = async (req, res) => {
  try {
    let admin = await User.findOne({ where: { id: req.body.id } });
    if (admin.is_admin === true) {
      let users = await User.findAll({ where: { is_active: '0' } });
      res.status(200).send(users);
    } else {
      res.send('only admin can see this');
    }
  } catch (e) {
    res.status(400).send(e);
  }
};
const viewRequests = async (req, res) => {
  try {
    const admin = await getUserFromSession(req, res);
    console.log(admin.id);
    const existingAdmin = await User.findOne({
      where: { id: admin.id, is_admin: true },
    });
    if (!existingAdmin) {
      res.status(404);
      return res.json(errorFunction(true, 'Only Admin Can see requests'));
    } else {
      try {
        const pendingRequests = await ProductMapping.findAll({
          status: 'pending',
        });
        if (pendingRequests) {
          return res.status(200).send(pendingRequests);
        } else {
          res.status(200);
          return res.json(
            errorFunction(
              false,
              'No pending requests,you are all caught up...!'
            )
          );
        }
      } catch (error) {
        res.status(400).send(error);
      }
    }
  } catch (error) {
    res.status(400).send(error);
  }
};
const removeStock = async (req, res) => {
  try {
    let admin = await User.findOne({ where: { id: req.body.admin_id } });
    if (admin.is_admin === true) {
      let stock = await Stock.findOne({ where: { id: req.body.stock_id } });
      if (stock) {
        stock.status = '0';
        await stock.save();
        res.status(200).send(stock);
      }
    } else {
      res.send('only admin can see this');
    }
  } catch (e) {
    res.status(400).send(e);
  }
};
module.exports = {
  updateProfile,
  addAdmin,
  getUsers,
  updateUser,
  getRemovedUsers,
  removeStock,
};

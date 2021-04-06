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
          where: {
            status: 'pending',
          },
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
const resRequests = async (req, res, next) => {
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
      if (req.body.is_accept) {
        var request = await ProductMapping.findOne({
          where: {
            id: req.body.request_id,
          },
        });
        if (request) {
          await request.update({
            issued_date: new Date(),
            status: 'accepted',
            assignedById: admin.id,
          });
          res.status(200);
          return res.json(errorFunction(false, 'Request accepted'));
        } else {
          res.status(404);
          return res.json(errorFunction(true, 'No such request Found...!'));
        }
      } else {
        var request = await ProductMapping.findOne({
          where: {
            id: req.body.request_id,
          },
        });
        if (request) {
          await request.update({
            issued_date: new Date(),
            status: 'rejected',
            assignedById: admin.id,
          });
          var product = await Product.findOne({
            where: {
              id: request.productId,
            },
          });
          if (product) {
            await product.update({
              is_available: 1,
            });
            var [name, id] = product.product_name.split('_');
            var stock = await Stock.findOne({
              where: {
                product_name: name,
              },
            });
            if (stock) {
              await stock.increment('available_qty', { by: 1 });
            } else {
              res.status(404);
              return res.json(errorFunction(true, 'No such Products in stock'));
            }
          } else {
            res.status(404);
            return res.json(errorFunction(true, 'No such Prouct in Products'));
          }
          res.status(200);
          return res.json(errorFunction(false, 'Request accepted'));
        } else {
          res.status(404);
          return res.json(errorFunction(true, 'No such request Found...!'));
        }
      }
    }
  } catch (error) {
    res.status(501);
    return res.json(errorFunction(true, 'Something Went Wrong' + error));
  }
};
const addStock = async (req, res, next) => {
  try {
    console.log('Inside Add Stock  Route');
    const admin = await getUserFromSession(req, res);
    console.log(admin.id);
    const existingAdmin = await User.findOne({
      where: { id: admin.id, is_admin: true },
    });
    if (!existingAdmin) {
      res.status(404);
      return res.json(
        errorFunction(true, 'Only Admin Have Rights To Add Stock Items')
      );
    }

    const newProduct = await Stock.create({
      product_name: req.body.product_name,
      available_qty: req.body.total_qty,
      total_qty: req.body.total_qty,
      product_image: req.body.product_image,
      price_per_product: req.body.price_per_product,
    });

    let i = req.body.total_qty;
    for (j = 1; j <= i; j++) {
      //text += cars[i] + "<br>";
      const products = await Product.create({
        product_name: req.body.product_name + '_' + [j],
        is_available: true,
      });
    }
    if (newProduct) {
      res.status(201);
      return res.json(
        errorFunction(false, 'Stock Added Successfully', { newProduct })
      );
    } else {
      res.status(404);
      return res.json(errorFunction(true, 'Stock Insetion Failed  '));
    }
  } catch (error) {
    res.status(501);
    return res.json(errorFunction(true, 'Something Went Wrong' + error));
  }
};
var acceptedRequests = async (req, res, next) => {
  try {
    const admin = getUserFromSession(req, res);
    console.log(admin.id);
    const existingAdmin = await User.findOne({
      where: { id: admin.id, is_admin: true },
    });
    if (!existingAdmin) {
      res.status(404);
      return res.json(
        errorFunction(true, 'Only Admin Have Rights To Add Stock Items')
      );
    } else {
      var acceptedRequestsbyAdmin = await ProductMapping.findAll({
        where: {
          status: 'accpeted',
          assignedById: admin.id,
        },
      });
      if (!acceptedRequestsbyAdmin) {
        res.status(404);
        return res.json(
          errorFunction(true, 'Only Admin Have Rights To Add Stock Items')
        );
      } else {
        res.status(200).send(acceptedRequestsbyAdmin);
      }
    }
  } catch (error) {
    res.status(501);
    return res.json(errorFunction(true, 'Something Went Wrong' + error));
  }
};
var rejectedRequests = async (req, res, next) => {
  try {
    const admin = getUserFromSession(req, res);
    console.log(admin.id);
    const existingAdmin = await User.findOne({
      where: { id: admin.id, is_admin: true },
    });
    if (!existingAdmin) {
      res.status(404);
      return res.json(
        errorFunction(true, 'Only Admin Have Rights To Add Stock Items')
      );
    } else {
      var rejectedRequestsbyAdmin = await ProductMapping.findAll({
        where: {
          status: 'rejected',
          assignedById: admin.id,
        },
      });
      if (!rejectedRequestsbyAdmin) {
        res.status(404);
        return res.json(
          errorFunction(true, 'Only Admin Have Rights To Add Stock Items')
        );
      } else {
        res.status(200).send(rejectedRequestsbyAdmin);
      }
    }
  } catch (error) {
    res.status(501);
    return res.json(errorFunction(true, 'Something Went Wrong' + error));
  }
};
module.exports = {
  updateProfile,
  addAdmin,
  getUsers,
  updateUser,
  getRemovedUsers,
  removeStock,
  addStock,
  viewRequests,
  resRequests,
  acceptedRequests,
  rejectedRequests,
};

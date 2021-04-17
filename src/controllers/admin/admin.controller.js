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
const { imageUpload } = require('../../utils/imageupload');

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
    const image_admin = await imageUpload(req.body.profile_pic, 'user');
    const c1 = await User.update(
      {
        user_name: req.body.name,
        mobile_number: req.body.mobile_number,
        password: hashedPassword,
        branch_id: req.body.branch_id,
        profile_pic: image_admin,
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
      profile_image: req.body.profile_image,
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
const getUsers = async (req, res, next) => {
  try {
    let admin = await getUserFromSession(req, res);
    const existingAdmin = await User.findOne({
      where: { id: admin.id, is_admin: true },
    });
    if (existingAdmin) {
      let users = await User.findAll({ where: { is_active: 1 } });
      if (users) {
        res.status(200);
        return res.json(
          errorFunction(false, 'Users data fetched Successfully', users)
        );
      } else {
        res.status(403);
        return res.json(
          errorFunction(true, 'Something Went wrong while getting Users')
        );
      }
    } else {
      res.status(403);
      return res.json(
        errorFunction(true, 'Only Admin Have Rights To See Users')
      );
    }
  } catch (error) {
    res.status(501);
    return res.json(errorFunction(true, 'Something Went Wrong'));
  }
};
const getAllProducts = async (req, res, next) => {
  try {
    var admin = await getUserFromSession(req, res);
    const existingAdmin = await User.findOne({
      where: { id: admin.id, is_admin: true },
    });
    if (existingAdmin) {
      const allProducts = await Product.findAll();
      if (allProducts) {
        res.status(200);
        return res.json(
          errorFunction(false, 'Showing Product details', allProducts)
        );
      } else if (allProducts.length === 0) {
        res.status(200);
        return res.json(errorFunction(false, 'Showing stock details', []));
      } else {
        res.status(400);
        return res.json(errorFunction(true, 'Error showing Stock Details'));
      }
    }
  } catch (error) {
    console.log(error);
    res.status(501);
    return res.json(errorFunction(true, 'Something Went Wrong'));
  }
};
const getProductById = async (req, res, next) => {
  try {
    var admin = await getUserFromSession(req, res);
    const existingAdmin = await User.findOne({
      where: { id: admin.id, is_admin: true },
    });
    if (existingAdmin) {
      const strid = req.params.id;
      const id = parseInt(strid);
      if (id === undefined || id < 0 || typeof id !== 'number') {
        res.status(404);
        return res.json(errorFunction(true, 'Error in Product ID'));
      } else {
        const product = await Product.findByPk(id);
        if (product) {
          res.status(200);
          return res.json(
            errorFunction(false, 'Showing Product Details', product)
          );
        } else {
          res.status(404);
          return res.json(errorFunction(true, 'Product Not Found'));
        }
      }
    }
  } catch (error) {
    res.status(501);
    return res.json(errorFunction(true, 'Something Went Wrong'));
  }
};
const updateUser = async (req, res, next) => {
  try {
    let admin = await getUserFromSession(req, res);
    const existingAdmin = await User.findOne({
      where: { id: admin.id, is_admin: true },
    });
    if (existingAdmin) {
      // let array=['user_name','profile_image','email','password','is_admin','is_active']
      const {
        user_id,
        user_name,
        email,
        mobile_number,
        password,
        is_admin,
        is_active,
      } = req.body;
      var user = await User.update(
        {
          user_name,

          email,
          password,
          mobile_number,
          is_admin,
          is_active,
        },
        { where: { id: user_id } }
      );
      if (user) {
        res.status(200);
        return res.json(errorFunction(false, 'User Value updated'));
      } else {
        res.status(403);
        return res.json(errorFunction(true, 'user Value has not been updated'));
      }
    } else {
      res.status(403);
      return res.json(
        errorFunction(true, 'Only Admin Have Rights To Update Users')
      );
    }
  } catch (error) {
    res.status(501);
    return res.json(errorFunction(true, 'Something Went Wrong'));
  }
};
const getRemovedUsers = async (req, res, next) => {
  try {
    let admin = await getUserFromSession(req, res);
    const existingAdmin = await User.findOne({
      where: { id: admin.id, is_admin: true },
    });
    if (existingAdmin) {
      let users = await User.findAll({ where: { is_active: 0 } });
      if (users) {
        res.status(200);
        return res.json(
          errorFunction(false, 'User has been fetched successfully', users)
        );
      } else {
        res.status(403);
        return res.json(errorFunction(true, 'user Value has not been fetched'));
      }
    } else {
      res.status(403);
      return res.json(
        errorFunction(true, 'Only Admin Have Rights To Update Users')
      );
    }
  } catch (error) {
    res.status(501);
    return res.json(errorFunction(true, 'Something Went Wrong'));
  }
};
const viewRequests = async (req, res, next) => {
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
const removeStock = async (req, res, next) => {
  try {
    let admin = await getUserFromSession(req, res);
    const existingAdmin = await User.findOne({
      where: { id: admin.id, is_admin: true },
    });
    if (existingAdmin) {
      let stock = await Stock.findOne({ where: { id: req.body.stock_id } });
      if (stock) {
        var qty = stock.total_qty;
        var pr_name = stock.product_name;
        for (var i = 1; i <= qty; i++) {
          var test_name = pr_name + '_' + i;
          var product = await Product.findOne({
            where: { product_name: test_name, is_available: 0 },
          });
          if (product) {
            res.status(403);
            return res.json(
              errorFunction(
                true,
                'Sorry we can not delete this stock any item has been aquired or request by someone'
              )
            );
          }
        }
        for (var i = 1; i <= qty; i++) {
          var test_name = pr_name + '_' + i;
          var product = await Product.findOne({
            where: { product_name: test_name },
          });
          product.destroy();
        }
        stock.destroy();
        res.status(201);
        return res.json(errorFunction(false, 'Stock Deleted Successfully'));
      } else {
        res.status(403);
        return res.json(
          errorFunction(true, 'Stock Value has not been Updated')
        );
      }
    } else {
      res.status(403);
      return res.json(
        errorFunction(true, 'Only Admin Have Rights To Update Users')
      );
    }
  } catch (error) {
    res.status(501);
    return res.json(errorFunction(true, 'Something Went Wrong'));
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
    const image_stock = await imageUpload(req.body.product_image, 'product');
    const newProduct = await Stock.create({
      product_name: req.body.product_name,
      available_qty: req.body.total_qty,
      total_qty: req.body.total_qty,
      product_image: image_stock,
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
      return res.json(errorFunction(true, 'Stock Insertion Failed  '));
    }
  } catch (error) {
    res.status(501);
    return res.json(errorFunction(true, 'Something Went Wrong' + error));
  }
};
const updateStock = async (req, res, next) => {
  try {
    console.log('Inside Update Stock  Route');
    const admin = await getUserFromSession(req, res);
    console.log(admin.id);
    const existingAdmin = await User.findOne({
      where: { id: admin.id, is_admin: true },
    });
    if (!existingAdmin) {
      res.status(404);
      return res.json(
        errorFunction(true, 'Only Admin Have Rights To Update Stock Items')
      );
    }
    const image_stock = await imageUpload(req.body.product_image, 'product');
    console.log(image_stock);
    const singleitem = await Stock.findOne({
      where: { id: req.body.stock_id },
    });
    var old_name = singleitem.product_name;
    var new_name = req.body.product_name;
    var old_qty = singleitem.total_qty;
    var new_qty = req.body.total_qty;
    console.log(singleitem.product_name);
    const updatedStock = await Stock.update(
      {
        product_name: req.body.product_name,
        available_qty: req.body.available_qty,
        total_qty: req.body.total_qty,
        product_image: image_stock,
        price_per_product: req.body.price_per_product,
      },
      {
        where: {
          id: req.body.stock_id,
        },
      }
    );
    if (updatedStock) {
      if (old_name != new_name || old_qty != new_qty) {
        if (old_qty === new_qty) {
          for (var i = 0; i < old_qty; i++) {
            const producttobeupdated = await Product.findOne({
              where: {
                product_name: old_name + '_' + [i],
              },
            });
            producttobeupdated.product_name = new_name + '_' + [i];
            await producttobeupdated.save();
          }
        } else if (old_qty < new_qty && old_name != new_name) {
          for (var i = 1; i <= new_qty; i++) {
            if (i > old_qty) {
              await Product.create({
                product_name: new_name + '_' + [i],
                is_available: 1,
              });
            } else {
              const producttobeupdated = await Product.findOne({
                where: {
                  product_name: old_name + '_' + [i],
                },
              });
              producttobeupdated.product_name = new_name + '_' + [i];
              await producttobeupdated.save();
            }
          }
        } else if (old_qty > new_qty && old_name != new_name) {
          for (var i = old_qty; i >= 1; i--) {
            if (i > new_qty) {
              const producttobedeleted = await Product.findOne({
                where: {
                  product_name: old_name + '_' + [i],
                },
              });
              producttobedeleted.destroy();
            } else {
              const producttobeupdated = await Product.findOne({
                where: {
                  product_name: old_name + '_' + [i],
                },
              });
              producttobeupdated.product_name = new_name + '_' + [i];
              await producttobeupdated.save();
            }
          }
        } else if (old_qty < new_qty && old_name === new_name) {
          for (var i = 1; i <= new_qty; i++) {
            if (i > old_qty) {
              await Product.create({
                product_name: new_name + '_' + [i],
                is_available: 1,
              });
            }
          }
        } else if (old_qty > new_qty && old_name === new_name) {
          for (var i = old_qty; i >= 1; i--) {
            if (i > new_qty) {
              const producttobedeleted = await Product.findOne({
                where: {
                  product_name: old_name + '_' + [i],
                },
              });
              producttobedeleted.destroy();
            }
          }
        }
      }
      res.status(201);
      return res.json(
        errorFunction(false, 'Stock Updated Successfully', { updatedStock })
      );
    } else {
      res.status(404);
      return res.json(errorFunction(true, 'Stock updation Failed  '));
    }
  } catch (error) {
    res.status(501);
    return res.json(errorFunction(true, 'Something Went Wrong' + error));
  }
};
var acceptedRequests = async (req, res, next) => {
  try {
    const admin = await getUserFromSession(req, res);
    console.log(admin.id);
    const existingAdmin = await User.findOne({
      where: { id: admin.id, is_admin: true },
    });
    if (!existingAdmin) {
      res.status(404);
      return res.json(
        errorFunction(true, 'Only Admin Have Rights To See Requests')
      );
    } else {
      var acceptedRequestsbyAdmin = await ProductMapping.findAll({
        where: {
          status: 'accepted',
          assignedById: admin.id,
        },
      });
      if (!acceptedRequestsbyAdmin) {
        res.status(404);
        return res.json(
          errorFunction(true, 'you have not accepted any requests')
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
    const admin = await getUserFromSession(req, res);
    console.log(admin.id);
    const existingAdmin = await User.findOne({
      where: { id: admin.id, is_admin: true },
    });
    if (!existingAdmin) {
      res.status(404);
      return res.json(
        errorFunction(true, 'Only Admin Have Rights To See Requests')
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
          errorFunction(true, 'you have not accepted any requests')
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
  updateStock,
  addStock,
  viewRequests,
  resRequests,
  acceptedRequests,
  rejectedRequests,
  getAllProducts,
  getProductById,
};

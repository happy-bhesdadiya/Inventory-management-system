require('dotenv').config();
const errorFunction = require('./../../utils/errorFunction');
const User = require('./../../models/user');
const ProductMapping = require('../../models/productMapping');
const Product = require('../../models/product');
const Stock = require('../../models/stock');
const emailRegEx = RegExp(/^[a-zA-Z0-9._]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
const { securePassword } = require('../../utils/securePassword');
const { tokenGeneration } = require('../../utils/jwtTokens');
const Cryptr = require('cryptr');
const { Op } = require('sequelize');
const getUserFromSession = require('../../utils/getUser');
const cryptr = new Cryptr(process.env.SECRET_KEY);

const sevenDays = 7 * 24 * 60 * 60 * 1000;
const { imageUpload } = require('../../utils/imageupload');

const employeeLogin = async (req, res, next) => {
  try {
    const { email, password, is_admin } = req.body;
    if (!is_admin && emailRegEx.test(email) && password.length >= 8) {
      const employee = await User.findOne({
        where: { email: email, is_admin: is_admin },
      });
      if (employee) {
        const tokenOriginal = await tokenGeneration({
          id: employee.id,
        });
        const token = cryptr.encrypt(tokenOriginal);

        res.cookie('access-token', token, {
          httpOnly: true,
          maxAge: sevenDays,
        });
        res.status(202);
        return res.json(
          errorFunction(false, 'Employee Logged In Successfully', employee)
        );
      } else {
        res.status(404);
        return res.json(errorFunction(true, 'Employee Not Found'));
      }
    } else {
      res.status(404);
      return res.json(errorFunction(true, 'Employee Not Found'));
    }
  } catch (error) {
    res.status(501);
    return res.json(errorFunction(true, 'Something Went Wrong'));
  }
};

const employeeSignUp = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (emailRegEx.test(email)) {
      const existingEmployee = await User.findOne({
        where: { email: email },
      });
      if (existingEmployee) {
        res.status(403);
        return res.json(errorFunction(true, 'Employee Already Exists'));
      } else {
        const hashedPassword = await securePassword(req.body.password);
        const newEmployee = await User.create({
          user_name: req.body.name,
          email: req.body.email,
          password: hashedPassword,
          mobile_number: req.body.mobile_number,
          branch_id: req.body.branch_id,
          is_active: req.body.is_active,
          is_admin: req.body.is_admin,
        });
        const employee = await User.findOne({
          where: { email: req.body.email },
        });
        if (employee) {
          const tokenOriginal = await tokenGeneration({
            id: employee.id,
          });
          const token = cryptr.encrypt(tokenOriginal);
          res.cookie('access-token', token, {
            httpOnly: true,
            maxAge: sevenDays,
          });
          res.status(201);
          return res.json(
            errorFunction(false, 'Employee Added Successfully', employee)
          );
        } else {
          res.status(400);
          return res.json(errorFunction(true, 'Error Adding Employee'));
        }
      }
    } else {
      res.status(400);
      return res.json(errorFunction(true, 'Error Adding Employee'));
    }
  } catch (error) {
    res.status(501);
    console.log('Error Adding Employee : ', error);
    return res.json(errorFunction(true, 'Something Went Wrong', error));
  }
};

const employeeViewProfile = async (req, res, next) => {
  try {
    const employee = await getUserFromSession(req, res);
    if (employee) {
      res.status(200);
      return res.json(
        errorFunction(false, 'Showing Employee Details', employee)
      );
    } else {
      res.status(404);
      return res.json(errorFunction(true, 'Unauthenticated Employee'));
    }
  } catch (error) {
    res.status(501);
    return res.json(errorFunction(true, 'Something Went Wrong', error));
  }
};

const employeeUpdateProfile = async (req, res, next) => {
  try {
    console.log('Inside Update Profile');
    const employee = await getUserFromSession(req, res);
    console.log(employee.email);
    const existingEmployee = await User.findOne({
      where: { email: employee.email },
    });
    if (!existingEmployee) {
      res.status(404);
      return res.json(errorFunction(true, 'Employee Not Found'));
    }
    const hashedPassword = await securePassword(req.body.password);
    const user_image = await imageUpload(req.body.profile_image, 'user');
    console.log(user_image);
    const c1 = await User.update(
      {
        user_name: req.body.name,
        mobile_number: req.body.mobile_number,
        password: hashedPassword,
        branch_id: req.body.branch_id,
        profile_image: user_image,
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
      const emp = await User.findOne({ where: { email: employee.email } });
      return res.json(
        errorFunction(false, 'Employee Data Updated Succesfully', emp)
      );
    } else {
      res.status(404);
      return res.json(errorFunction(true, 'Employee Data  Not Updated '));
    }
  } catch (e) {
    res.status(501);
    return res.json(errorFunction(true, 'Something went wrong', e));
  }
};
const aquireProduct = async (req, res, next) => {
  const { stock_id } = req.body;
  try {
    const employee = await getUserFromSession(req, res);

    if (employee) {
      //console.log('got employee', employee);
      console.log(stock_id);
      const isStockexistsandAvailable = await Stock.findOne({
        where: { id: stock_id, available_qty: { [Op.ne]: 0 } },
      });
      console.log(isStockexistsandAvailable);
      if (isStockexistsandAvailable) {
        console.log('stock is available');
        var checkname =
          isStockexistsandAvailable.product_name +
          isStockexistsandAvailable.total_qty.toString();
        console.log(checkname);
        for (var i = 0; i < isStockexistsandAvailable.total_qty; i++) {
          var checkname =
            isStockexistsandAvailable.product_name + '_' + (i + 1).toString();
          const availableProduct = await Product.findOne({
            where: { product_name: checkname, is_available: 1 },
          });
          console.log(availableProduct);
          if (availableProduct) {
            const newProductMap = await ProductMapping.create({
              productId: availableProduct.id,
              assignedToId: employee.id,
              status: 'Pending',
            });
            var available_qty = isStockexistsandAvailable.available_qty;
            isStockexistsandAvailable.update({
              available_qty: available_qty - 1,
            });
            availableProduct.update({ is_available: 0 });
            res.status(200);
            return res.json(
              errorFunction(false, 'Your Request Has been sent to the Admin')
            );
          }
        }
      } else {
        res.status(404);
        return res.json(
          errorFunction(
            true,
            'Either This product is wrong or it is out of stock'
          )
        );
      }
    } else {
      res.status(404);
      return res.json(errorFunction(true, 'Unauthenticated Employee'));
    }
  } catch (error) {
    res.status(501);
    return res.json(errorFunction(true, 'Something Went Wrong', error));
  }
};
const getMyAllRequest = async (req, res, next) => {
  try {
    const employee = await getUserFromSession(req, res);
    if (employee) {
      const data = await ProductMapping.findAll({
        attributes: [
          'id',
          'status',
          'productId',
          'assignedById',
          'returned_date',
          'createdAt',
        ],
        where: { assignedToId: employee.id },
      });
      if (data.length !== 0) {
        var length = data.length;
        var i = 1;
        console.log(data, length);
        var myRequests = [];
        data.forEach(async (request) => {
          var product_id = request.productId;
          var status = request.status;
          console.log(status);
          var rid = request.id;
          const result = await Product.findOne({
            attributes: ['product_name'],
            where: { id: product_id },
          });
          const resultPrice = await Stock.findOne({
            attributes: ['price_per_product'],
            where: {
              product_name: result.product_name.split('_')[0],
            },
          });
          if (status === 'Pending') {
            var pendingRequest = {
              id: rid,
              product_id: product_id,
              product_name: result.product_name.split('_')[0],
              status: status,
              createdAt: request.createdAt,
              price: resultPrice.price_per_product,
            };
            myRequests.push(pendingRequest);
            console.log('In pending One:', myRequests);
          }
          if (status === 'Rejected') {
            var rejectedRequests = {
              id: rid,
              product_id: product_id,
              product_name: result.product_name.split('_')[0],
              status: status,
              createdAt: request.createdAt,
              price: resultPrice.price_per_product,
            };
            myRequests.push(rejectedRequests);
          }
          if (status === 'Accepted') {
            var acceptedRequests = {
              id: rid,
              product_id: product_id,
              status: status,
              product_name: result.product_name.split('_')[0],
              assigned_by: request.assignedById,
              createdAt: request.createdAt,
              returnDate: request.returned_date,
              price: resultPrice.price_per_product,
            };
            myRequests.push(acceptedRequests);
          }
          if (i === length) {
            console.log(myRequests);
            res.status(200);
            return res.json(
              errorFunction(false, 'Requests Fetched Succesfully', myRequests)
            );
          }
          i++;
        });
      } else {
        res.status(200);
        return res.json(
          errorFunction(false, `You haven't made any requests yet`, [])
        );
      }
    } else {
      res.status(404);
      return res.json(errorFunction(true, `Wrong User details`));
    }
  } catch (error) {
    console.log(error);
    res.status(500);
    return res.json(errorFunction(true, 'Something Went Wrong'));
  }
};

const employeeLogout = async (req, res, next) => {
  try {
    const employee = await getUserFromSession(req, res);
    if (employee) {
      res.clearCookie('access-token');
      res.status(200);
      return res.json(errorFunction(false, 'User Logged Out', null));
    } else {
      res.status(404);
      return res.json(errorFunction(true, 'Unauthenticated Employee'));
    }
  } catch (error) {
    res.status(501);
    return res.json(errorFunction(true, 'Something Went Wrong', error));
  }
};

module.exports = {
  employeeLogin,
  employeeSignUp,
  aquireProduct,
  employeeViewProfile,
  employeeLogout,
  employeeUpdateProfile,
  getMyAllRequest,
};

require("dotenv").config();
const errorFunction = require("./../../utils/errorFunction");
const User = require("./../../models/user");
const emailRegEx = RegExp(/^[a-zA-Z0-9._]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
const { securePassword } = require("../../utils/securePassword");
const { tokenGeneration } = require("../../utils/jwtTokens");
const Cryptr = require("cryptr");
const getUserFromSession = require("../../utils/getUser");
const cryptr = new Cryptr(process.env.SECRET_KEY);

const sevenDays = 7 * 24 * 60 * 60 * 1000;

const adminLogin = async (req, res, next) => {
     try {
          const { email, password, is_admin } = req.body;
          if (emailRegEx.test(email) && password.length > 8) {
               const admin = await User.findOne({ where: { email: email, is_admin: is_admin } });
               if (admin) {
                    const tokenOriginal = await tokenGeneration({ id: admin.id });
                    const token = cryptr.encrypt(tokenOriginal);

                    res.cookie("access-token", token, {
                         maxAge: sevenDays,
                         httpOnly: true,
                         secure: false,
                         path: "/",
                         sameSite: "none",
                    });
                    res.status(202);
                    return res.json(errorFunction(false, "Admin Logged In Successfully", { admin, token }));
               } else {
                    res.status(404);
                    return res.json(errorFunction(true, "Admin Not Found"));
               }
          } else {
               res.status(404);
               return res.json(errorFunction(true, "Admin Not Found"));
          }
     } catch (error) {
          res.status(501);
          return res.json(errorFunction(true, "Something Went Wrong"));
     }
}


module.exports = {
     adminLogin
}
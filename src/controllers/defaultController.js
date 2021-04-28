const errorFunction = require("../utils/errorFunction");

const defaultController = async (req, res, next) => {
     res.status(200);
     return res.json(errorFunction(false, "Welcome to Bacancy Inventory Portal", "Good Morning"));
}

const authenticationController = async (req, res, next) => {
     res.status(200);
     return res.json(errorFunction(false, "User Authenticated", "Authorized"));
}

module.exports = { defaultController, authenticationController };
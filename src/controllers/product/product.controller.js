const Stock = require("../../models/stock");
const Product = require("../../models/product");
const errorFunction = require("../../utils/errorFunction");

const getAllStock = async (req, res, next) => {
	try {
		const allStocks = await Stock.findAll();
		if (allStocks) {
			res.status(200);
			return res.json(
				errorFunction(false, "Showing stock details", allStocks)
			);
		} else if (allStocks.length === 0) {
			res.status(200);
			return res.json(
				errorFunction(false, "Showing stock details", [])
			);
		} else {
			res.status(400);
			return res.json(
				errorFunction(true, "Error showing Stock Details")
			);
		}
	} catch (error) {
		console.log("Error :", e);
		res.status(501);
		return errorFunction(true, "Something went Wrong");
	}
};

const getAllProduct = async (req, res, next) => {
	try {
		const allProducts = await Product.findAll();
		if (allProducts) {
			res.status(200);
			return res.json(
				errorFunction(false, "Showing Product details", allProducts)
			);
		} else if (allProducts.length === 0) {
			res.status(200);
			return res.json(
				errorFunction(false, "Showing stock details", [])
			);
		} else {
			res.status(400);
			return res.json(
				errorFunction(true, "Error showing Stock Details")
			);
		}
	} catch (error) {
		console.log("Error :", e);
		res.status(501);
		return errorFunction(true, "Something went Wrong");
	}
};

const getProductById = async (req, res, next) => {
	try {
		const id = req.body.id;
		if (id === undefined || id < 0 || typeof id !== "number") {
			res.status(404);
			return res.json(errorFunction(true, "Error in Product ID"));
		} else {
			const product = await Product.findByPk(id);
			if (product) {
				res.status(200);
				return res.json(
					errorFunction(
						false,
						"Showing Product Details",
						product
					)
				);
			} else {
				res.status(404);
				return res.json(errorFunction(true, "Product Not Found"));
			}
		}
	} catch (error) {
		console.log("Error :", e);
		res.status(501);
		return errorFunction(true, "Something went Wrong");
	}
};

module.exports = {
	getAllStock,
	getAllProduct,
	getProductById,
};

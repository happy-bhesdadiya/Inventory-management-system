require("dotenv").config();
const User = require("./../models/user");
const { tokenVerification } = require("./jwtTokens");
const Cryptr = require("cryptr");
const errorFunction = require("./errorFunction");
const cryptr = new Cryptr(process.env.SECRET_KEY);

const getUserFromSession = async (req, res) => {
	try {
		const tokenEncrypted = req.cookies["access-token"];

		if (!tokenEncrypted)
			return res.status(401).json(errorFunction(true, "Unauthorized"));
		const token = await cryptr.decrypt(tokenEncrypted);
		const decoded = await tokenVerification(token);
		const user = await User.findByPk(decoded.id);

		if (user === null)
			return res
				.status(403)
				.json(errorFunction(true, "User not Found"));
		else return user;
	} catch (err) {
		console.error(err);
		return res
			.status(500)
			.json(errorFunction(true, "Something Went Wrong", err));
	}
};

module.exports = getUserFromSession;

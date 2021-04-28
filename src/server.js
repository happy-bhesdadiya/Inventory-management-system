require("dotenv").config();
const express = require("express");
const sequelize = require("./utils/connect");
const http = require("http");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const routes = require("./routes/routes");
const Branch = require("./models/branch");
const ProductMapping = require("./models/productMapping");

const app = express();
app.use(express.json({ limit: "100MB" }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: true }));
app.use(morgan("dev"));

const server = http.createServer(app);

const port = process.env.PORT || 5000;

const startServer = async () => {
	try {
		await sequelize.authenticate();
		console.log("Connected to DB Successfully!");
		// await sequelize.sync({ force: true });
		// await sequelize.sync({ alter: true });
		await sequelize.sync();
		// await addBranches();
		// await addProductMapping();
		server.listen(port, () => {
			console.log(`Server Started on Port: ${port}`);
			app.use("/", routes);
		});
	} catch (error) {
		console.log("Error connecting to the Application", error);
	}
};

const addProductMapping = async () => {
	const mapping1 = await ProductMapping.create({
		issued_date: "2021-03-31 12:46:11",
		returned_date: "2021-05-31 12:46:11",
		status: "Accepted",
		assignedById: 4,
		assignedToId: 1,
		productId: 1,
	});
	const mapping2 = await ProductMapping.create({
		issued_date: "2021-03-31 12:50:11",
		returned_date: "2021-05-31 12:50:11",
		status: "Accepted",
		assignedById: 4,
		assignedToId: 1,
		productId: 2,
	});
	const mapping3 = await ProductMapping.create({
		issued_date: "2021-03-31 12:54:11",
		returned_date: "2021-05-31 12:54:11",
		status: "Accepted",
		assignedById: 4,
		assignedToId: 1,
		productId: 3,
	});
	const mapping4 = await ProductMapping.create({
		issued_date: "2021-03-31 12:58:11",
		returned_date: "2021-05-31 12:58:11",
		status: "Accepted",
		assignedById: 4,
		assignedToId: 1,
		productId: 4,
	});
	const mapping5 = await ProductMapping.create({
		productId: 5,
		assignedToId: 1,
	});
	const mapping6 = await ProductMapping.create({
		status: "Rejected",
		assignedToId: 1,
		productId: 6,
	});
	const mapping7 = await ProductMapping.create({
		status: "Rejected",
		assignedToId: 1,
		productId: 7,
	});
	const mapping8 = await ProductMapping.create({
		assignedToId: 1,
		productId: 8,
	});
};

const addBranches = async () => {
	const b1 = await Branch.create({
		branch_name: "8th Floor, Thaltej",
	});
	const b2 = await Branch.create({
		branch_name: "12th Floor, Thaltej",
	});
	const b3 = await Branch.create({
		branch_name: "Gift City, Gandhinagar",
	});
};

startServer();

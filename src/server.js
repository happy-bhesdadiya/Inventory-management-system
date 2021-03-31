require("dotenv").config();
const express = require("express");
const sequelize = require("./utils/connect");
const http = require("http");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const routes = require("./routes/routes");
const Branch = require("./models/branch");

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
         await sequelize.sync();
        // await addBranches();
        server.listen(port, () => {
            console.log(`Server Started on Port: ${port}`);
            app.use("/", routes);
        });
    } catch (error) {
        console.log("Error connecting to the Application", error);
    }
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

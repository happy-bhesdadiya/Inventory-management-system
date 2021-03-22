const jwt = require("jsonwebtoken");
require('dotenv').config({path:'../../credentials.env'})

function generateAccessToken(email) {
    // expires after half and hour (1800 seconds = 30 minutes)
    return jwt.sign(email,"abcd12345efghi");
}

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader;

        jwt.verify(token, "abcd12345efghi", (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }

            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

module.exports={
    generateAccessToken,
    authenticateJWT
}
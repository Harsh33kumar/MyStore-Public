const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const isAuth = async (req, res, next) => {
    try {
        let { token } = req.cookies;

        if (!token) {
            return res.status(400).json({ message: "User token not found" });
        }

        let verifyToken = jwt.verify(token, process.env.JWT_SECRET);

        if (!verifyToken) {
            return res.status(400).json({ message: "Not valid token" });
        }

        req.userId = verifyToken.userId;
        next();

    } catch (error) {
        console.log("isAuth token error:", error.message);

        return res.status(500).json({
            message: `isAuth error ${error.message}`
        });
    }
};

module.exports = isAuth;
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const isAdminAuth = async (req, res, next) => {
    try {
        let { token } = req.cookies;

        if (!token) {
            return res.status(400).json({ message: "User token not found" });
        }

        let verifyToken = jwt.verify(token, process.env.JWT_SECRET);

        if (!verifyToken) {
            return res.status(400).json({ message: "Not valid token" });
        }
        req.adminEmail = process.env.ADMIN_EMAIL;

        next();

    } catch (error) {
        console.log("admin auth token error:", error.message);

        return res.status(500).json({
            message: `admin auth error ${error.message}`
        });
    }
};

module.exports = isAdminAuth;
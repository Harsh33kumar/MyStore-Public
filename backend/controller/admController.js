const { admgenToken } = require("../config/token");
const dotenv = require('dotenv');
dotenv.config();

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email === process.env.ADMIN_EMAIL_LOGIN &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = await admgenToken(email);

      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000
      });

      return res.status(200).json({
        success: true,
        message: "Login Successful",
        Token:token
      });
    }

    return res.status(401).json({
      success: false,
      message: "Invalid Credentials"
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Login Failed backend"
    });
  }
};

module.exports = { adminLogin };
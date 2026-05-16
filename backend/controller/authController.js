const User = require('../models/User.model');
const bcrypt = require('bcrypt');
const  {genToken } = require('../config/token');

const Signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check Existing User
        const existUser = await User.findOne({ email });

        if (existUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }

        // Password Check
        if (password.length < 8) {
            return res.status(400).json({
                success: false,
                message: "Enter Strong Password"
            });
        }

        // Hash Password
        const hashPassword = await bcrypt.hash(password, 10);

        // Create User
        const user = await User.create({
            username,
            email,
            password: hashPassword
        });

        // Token
        const token = genToken(user._id);

        // Cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.status(201).json({
            success: true,
            message: "Signup Successful",
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Signup Error",
            error
        });
    }
};

const Login = async (req,res) => {

        try {
        const {email, password } = req.body;

        // Check Existing User
        const myUser = await User.findOne({ email });


        if (!myUser) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        let isMatched = await bcrypt.compare(password,myUser.password);
        if(!isMatched){
            return res.status(400).json({
                success: false,
                message: "Incorrect Password"
            });
        }


        // Token
        const token = genToken(myUser._id);

        // Cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.status(201).json({
            success: true,
            message: "Login Successful",
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Login Failed",
            error
        });
    }
}

const Logout = async(req,res)=>{
    try{
        res.clearCookie("token");
        return res.status(201).json({
            success: true,
            message: "Logout Successful",
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Logout Failed",
            error
        });
    }
}

module.exports = { Signup, Login, Logout };


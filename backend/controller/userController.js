const User = require('../models/User.model');
const getCurrentUser = async (req,res) => {
    try{
        let user = await User.findById(req.userId).select("-password");
        if(!user){
            return res.status(404).json({message : "user is not found"})
        }
        return res.status(200).json(user);
    }catch(error){
        console.log("current user not found");
        return res.status(500).json({message:`current user error ${error}`});
    }
}

const getAdmin = async (req, res) => {
    try{
        let admin = req.adminEmail;
        if(!admin){
            return res.status(404).json({message : "admin is not found"})
        }
        return res.status(200).json({
            email:admin,
            role:'admin',
        });
    }catch(error){
        console.log("current admin not found");
        return res.status(500).json({message:`current admin error ${error}`});
    }
}
module.exports = { getCurrentUser, getAdmin };
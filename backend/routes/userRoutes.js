const express = require('express');
const userRoutes = express.Router();
const isAuth = require('../middleware/isAuth.js');
const isAdminAuth = require('../middleware/Adminauth.js')

const { getCurrentUser, getAdmin } = require('../controller/userController');

userRoutes.get('/getcurrentuser',isAuth, getCurrentUser);
userRoutes.get('/getAdmin',isAdminAuth, getAdmin);



module.exports = userRoutes;
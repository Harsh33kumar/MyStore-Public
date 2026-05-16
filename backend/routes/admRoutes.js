const express = require('express');
const admRoutes = express.Router();
const isAdminAuth = require('../middleware/Adminauth');

const { adminLogin } = require('../controller/admController');


admRoutes.post('/adminlogin', adminLogin);
// admRoutes.post('/logout', Logout);

module.exports = admRoutes;
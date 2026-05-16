const express = require('express');
const authRoutes = express.Router();

const { Signup, Login, Logout } = require('../controller/authController');

authRoutes.post('/signup', Signup);
authRoutes.post('/login', Login);
authRoutes.post('/logout', Logout);

module.exports = authRoutes;
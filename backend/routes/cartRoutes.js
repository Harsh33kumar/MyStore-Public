const express = require("express");
const router = express.Router();
const isAuth = require('../middleware/isAuth.js');

const {
 addCart,
 listCart,
 deleteCart
} = require("../controller/cartController");

router.post("/add", isAuth, addCart);
router.get("/list", isAuth, listCart);
router.delete("/delete/:id", isAuth, deleteCart);

module.exports = router;
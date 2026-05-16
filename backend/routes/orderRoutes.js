

const express = require("express");
const router = express.Router();
const isAuth = require('../middleware/isAuth.js');

const {
  placeOrder,
  getAllOrders,
  acceptOrder,
  rejectOrder,
  deleteOrder,
} = require("../controller/orderController");

router.post("/place", placeOrder);

router.get("/all", getAllOrders);

router.put("/accept/:id", acceptOrder);

router.put("/reject/:id", rejectOrder);

router.delete("/delete/:id", deleteOrder);

module.exports = router;
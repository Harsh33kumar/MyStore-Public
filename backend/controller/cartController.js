const { request } = require("express");
const Cart = require("../models/cart.model");

const addCart = async (req, res) => {
    // console.log("Request body in addCart:", req.body);
  try {
    const cart = await Cart.create(req.body);

    res.json({
      success: true,
      message: "Added To Cart",
      cart
    });

  } catch (error) {
    // console.log("addCart error:", error);
    res.status(500).json({ success: false });
  }
};

const listCart = async (req, res) => {

// console.log("User ID in listCart:", req.userId); // Debugging line
  try {
    const carts = await Cart.find({
      userId: req.userId, // 🔥 correct
    }).populate("productId");
    res.json({
      success: true,
      carts
    });

  } catch (error) {
    res.status(500).json({ success: false });

  }
};

const deleteCart = async (req, res) => {
  await Cart.findByIdAndDelete(req.params.id);

  res.json({
    success: true,
    message: "Removed"
  });
};

module.exports = {
  addCart,
  listCart,
  deleteCart
};

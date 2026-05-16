// const Order = require("../models/order.model");

// const placeOrder = async(req,res)=>{
//   const order = await Order.create(req.body);

//   res.json({
//     success:true,
//     message:"Order Placed",
//     order
//   });
// };

// module.exports = { placeOrder };

const Order = require("../models/order.model");


// Place Order
const placeOrder = async (req, res) => {
  try {
    const order = await Order.create(req.body);

    res.json({
      success: true,
      message: "Order Placed",
      order,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};


// Get All Orders (Admin)
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("productId")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      orders,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};


// Accept Order
const acceptOrder = async (req, res) => {
  try {
    await Order.findByIdAndUpdate(req.params.id, {
      status: "Accepted",
    });

    res.json({
      success: true,
      message: "Order Accepted",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};


// Reject Order
const rejectOrder = async (req, res) => {
  try {
    await Order.findByIdAndUpdate(req.params.id, {
      status: "Rejected",
    });

    res.json({
      success: true,
      message: "Order Rejected",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};


// Delete Order
const deleteOrder = async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Order Deleted",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  placeOrder,
  getAllOrders,
  acceptOrder,
  rejectOrder,
  deleteOrder,
};
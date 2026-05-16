const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({

  name: String,

  phone: String,

  address: String,

  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "product",
  },

  size: String,

  amount: Number,

  paymentId: String,

  paymentStatus: String,

}, {
  timestamps: true,
});

module.exports = mongoose.model(
  "order",
  orderSchema
);
const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
{
  userId: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  userEmail: {
    type: String,
    required: true
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product"
  },
  size: String,
  quantity: Number
},
{ timestamps: true }
);

module.exports = mongoose.model("Cart", cartSchema);
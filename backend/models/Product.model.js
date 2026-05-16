const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    image1: {
      type: String,
      required: true,
    },

    image2: {
      type: String,
      required: true,
    },

    image3: {
      type: String,
      required: true,
    },

    image4: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    subCategory: {
      type: String,
      required: true,
      trim: true,
    },

    sizes: {
      type: [String],
      required: true,
    },

    bestSeller: {
      type: Boolean,
      default: false,
    },

    date: {
      type: Number,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
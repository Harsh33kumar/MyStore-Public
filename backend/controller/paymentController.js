const Razorpay = require("razorpay");

const crypto = require("crypto");

const Order = require("../models/payment");
const dotenv = require("dotenv");
dotenv.config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,

  key_secret: process.env.RAZORPAY_KEY_SECRET,
});


// CREATE ORDER
// const createOrder = async (req, res) => {

//   try {

//     const { amount } = req.body;

//     const options = {
//       amount: amount * 100,
//       currency: "INR",
//       receipt: `receipt_${Date.now()}`,
//     };

//     const order = await razorpay.orders.create(
//       options
//     );

//     res.status(200).json({
//       success: true,
//       order,
//     });

//   } catch (error) {

//     console.log(error);

//     res.status(500).json({
//       success: false,
//       message: "Order Creation Failed",
//     });
//   }
// };

const createOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount) {
      return res.status(400).json({
        success: false,
        message: "Amount required",
      });
    }

    const options = {
      amount: Number(amount) * 100,
      currency: "INR",
      receipt: `rcpt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    return res.status(200).json({
      success: true,
      order,
    });

  } catch (error) {
    console.log("Razorpay create order error:", error);

    return res.status(500).json({
      success: false,
      message: error.error?.description || "Order creation failed",
    });
  }
};

// VERIFY PAYMENT
const verifyPayment = async (req, res) => {

  try {

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,

      name,
      phone,
      address,
      productId,
      size,
      amount,

    } = req.body;

    // GENERATE SIGNATURE
    const generated_signature =
      crypto
        .createHmac(
          "sha256",
          process.env.RAZORPAY_KEY_SECRET
        )
        .update(
          razorpay_order_id +
          "|" +
          razorpay_payment_id
        )
        .digest("hex");

    // VERIFY SIGNATURE
    if (
      generated_signature !==
      razorpay_signature
    ) {

      return res.status(400).json({
        success: false,
        message: "Payment Verification Failed",
      });
    }

    // SAVE ORDER
    await Order.create({
      name,
      phone,
      address,
      productId,
      size,
      amount,

      paymentId: razorpay_payment_id,

      paymentStatus: "Paid",
    });

    res.status(200).json({
      success: true,
      message: "Payment Verified",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Verification Failed",
    });
  }
};

module.exports = {
  createOrder,
  verifyPayment,
};
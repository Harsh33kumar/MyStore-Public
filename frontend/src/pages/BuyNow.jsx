// import React, { useState } from "react";
// import { useLocation } from "react-router-dom";
// import axios from "axios";

// function BuyNow() {
//   const { state } = useLocation();
//   const { product, size } = state;

//   const [form, setForm] = useState({
//     name: "",
//     phone: "",
//     address: "",
//   });

//   const [loading, setLoading] = useState(false);

//   const placeOrder = async () => {
//     try {
//       setLoading(true);

//       await axios.post("/apiorder/place", {
//         ...form,
//         productId: product._id,
//         size,
//         amount: product.price,
//       });

//       alert("Order Placed Successfully");

//       setForm({
//         name: "",
//         phone: "",
//         address: "",
//       });
//     } catch (error) {
//       alert("Failed to place order");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white px-4 py-10">
//       <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
        
//         {/* Product Section */}
//         <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 shadow-xl border border-white/10">
//           <img
//             src={product.image1}
//             alt={product.name}
//             className="w-full h-[380px] object-cover rounded-2xl mb-6"
//           />

//           <h1 className="text-3xl font-bold mb-3">{product.name}</h1>

//           <p className="text-slate-300 mb-4 leading-7">
//             {product.description}
//           </p>

//           <div className="space-y-2 text-lg">
//             <p>
//               Price:{" "}
//               <span className="text-green-400 font-bold">
//                 ₹{product.price}
//               </span>
//             </p>

//             <p>
//               Selected Size:{" "}
//               <span className="text-cyan-400 font-semibold">{size}</span>
//             </p>
//           </div>
//         </div>

//         {/* Order Form */}
//         <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 shadow-xl border border-white/10">
//           <h2 className="text-3xl font-bold mb-6">Shipping Details</h2>

//           <div className="space-y-5">
//             <input
//               type="text"
//               placeholder="Full Name"
//               value={form.name}
//               onChange={(e) =>
//                 setForm({ ...form, name: e.target.value })
//               }
//               className="w-full p-4 rounded-xl bg-slate-800 border border-slate-600 outline-none focus:border-cyan-400"
//             />

//             <input
//               type="text"
//               placeholder="Phone Number"
//               value={form.phone}
//               onChange={(e) =>
//                 setForm({ ...form, phone: e.target.value })
//               }
//               className="w-full p-4 rounded-xl bg-slate-800 border border-slate-600 outline-none focus:border-cyan-400"
//             />

//             <textarea
//               rows="5"
//               placeholder="Complete Address"
//               value={form.address}
//               onChange={(e) =>
//                 setForm({ ...form, address: e.target.value })
//               }
//               className="w-full p-4 rounded-xl bg-slate-800 border border-slate-600 outline-none focus:border-cyan-400 resize-none"
//             ></textarea>

//             <button
//               onClick={placeOrder}
//               disabled={loading}
//               className="w-full bg-green-500 hover:bg-green-600 transition-all duration-300 py-4 rounded-xl text-lg font-semibold"
//             >
//               {loading ? "Placing Order..." : `Place Order ₹${product.price}`}
//             </button>
//           </div>

//           <p className="text-sm text-slate-400 mt-5 text-center">
//             Cash on Delivery Available
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default BuyNow;


import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

function BuyNow() {

  const { state } = useLocation();

  const { product, size } = state;

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const [loading, setLoading] = useState(false);

  // LOAD RAZORPAY SCRIPT
  const loadRazorpay = () => {
    return new Promise((resolve) => {

      const script = document.createElement("script");

      script.src = "https://checkout.razorpay.com/v1/checkout.js";

      script.onload = () => {
        resolve(true);
      };

      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };

  // PAYMENT FUNCTION
  const placeOrder = async () => {

    try {

      setLoading(true);

      // LOAD SDK
      const res = await loadRazorpay();

      if (!res) {
        alert("Razorpay SDK Failed To Load");
        return;
      }

      // CREATE ORDER FROM BACKEND
      const orderResponse = await axios.post(
        " /api/payment/create-order",
        {
          amount: product.price,
        }
      );

      const order = orderResponse.data.order;

      // RAZORPAY OPTIONS
      const options = {
        key: "rzp_test_SmUuO2vR3mKG5M",

        amount: order.amount,

        currency: order.currency,

        name: "E-Cart",

        description: "Product Payment",

        order_id: order.id,

        handler: async function (response) {

          try {

            // VERIFY PAYMENT + PLACE ORDER
            const verifyResponse = await axios.post(
              " /api/payment/verify-payment",
              {
                razorpay_order_id:
                  response.razorpay_order_id,

                razorpay_payment_id:
                  response.razorpay_payment_id,

                razorpay_signature:
                  response.razorpay_signature,

                // ORDER DATA
                name: form.name,
                phone: form.phone,
                address: form.address,
                productId: product._id,
                size,
                amount: product.price,
              }
            );

            if (verifyResponse.data.success) {

              alert("Payment Successful & Order Placed");

              setForm({
                name: "",
                phone: "",
                address: "",
              });

            } else {

              alert("Payment Verification Failed");
            }

          } catch (error) {

            console.log(error);

            alert("Order Failed");
          }
        },

        prefill: {
          name: form.name,
          contact: form.phone,
        },

        theme: {
          color: "#06b6d4",
        },
      };

      const paymentObject = new window.Razorpay(
        options
      );

      paymentObject.open();

    } catch (error) {

      console.log(error);

      alert("Payment Failed");

    } finally {

      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white px-4 py-10">

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">

        {/* PRODUCT SECTION */}
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 shadow-xl border border-white/10">

          <img
            src={product.image1}
            alt={product.name}
            className="w-full h-[380px] object-cover rounded-2xl mb-6"
          />

          <h1 className="text-3xl font-bold mb-3">
            {product.name}
          </h1>

          <p className="text-slate-300 mb-4 leading-7">
            {product.description}
          </p>

          <div className="space-y-2 text-lg">

            <p>
              Price:
              <span className="text-green-400 font-bold">
                ₹{product.price}
              </span>
            </p>

            <p>
              Selected Size:
              <span className="text-cyan-400 font-semibold">
                {size}
              </span>
            </p>
          </div>
        </div>

        {/* FORM SECTION */}
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 shadow-xl border border-white/10">

          <h2 className="text-3xl font-bold mb-6">
            Shipping Details
          </h2>

          <div className="space-y-5">

            <input
              type="text"
              placeholder="Full Name"
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
              className="w-full p-4 rounded-xl bg-slate-800 border border-slate-600 outline-none focus:border-cyan-400"
            />

            <input
              type="text"
              placeholder="Phone Number"
              value={form.phone}
              onChange={(e) =>
                setForm({
                  ...form,
                  phone: e.target.value,
                })
              }
              className="w-full p-4 rounded-xl bg-slate-800 border border-slate-600 outline-none focus:border-cyan-400"
            />

            <textarea
              rows="5"
              placeholder="Complete Address"
              value={form.address}
              onChange={(e) =>
                setForm({
                  ...form,
                  address: e.target.value,
                })
              }
              className="w-full p-4 rounded-xl bg-slate-800 border border-slate-600 outline-none focus:border-cyan-400 resize-none"
            ></textarea>

            <button
              onClick={placeOrder}
              disabled={loading}
              className="w-full bg-green-500 hover:bg-green-600 transition-all duration-300 py-4 rounded-xl text-lg font-semibold"
            >
              {loading
                ? "Processing..."
                : `Pay ₹${product.price}`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BuyNow;
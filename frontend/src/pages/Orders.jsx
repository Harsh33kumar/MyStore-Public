// import React, { useContext, useEffect, useState } from "react";
// import axios from "axios";
// import { userDataContext } from "../context/UserContext";

// function Orders() {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const { user } = useContext(userDataContext);

//   /* =====================================
//       FETCH ONLY MY ORDERS
//   ===================================== */
//   const fetchOrders = async () => {
//     try {
//       if (!user) {
//         setLoading(false);
//         return;
//       }

//       const res = await axios.get(
//         `/apiorder/list/${user._id}`
//       );

//       setOrders(res.data.orders);
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchOrders();
//   }, [user]);

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-[#0f172a] text-white flex justify-center items-center text-2xl">
//         Loading Orders...
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#0f172a] text-white px-6 py-10">
//       <div className="max-w-6xl mx-auto">
//         {/* Heading */}
//         <h1 className="text-4xl font-bold text-cyan-400 mb-10 text-center">
//           My Orders
//         </h1>

//         {/* If User Not Logged In */}
//         {!user ? (
//           <div className="text-center text-xl text-gray-400">
//             Please Login to See Your Orders
//           </div>
//         ) : orders.length > 0 ? (
//           <div className="space-y-6">
//             {orders.map((item) => (
//               <div
//                 key={item._id}
//                 className="bg-[#1e293b] rounded-2xl p-5 shadow-lg flex flex-col md:flex-row justify-between gap-6"
//               >
//                 {/* Product Details */}
//                 <div className="flex gap-5">
//                   <img
//                     src={item.productId?.image1}
//                     alt={item.productId?.name}
//                     className="w-28 h-28 object-cover rounded-xl"
//                   />

//                   <div>
//                     <h2 className="text-2xl font-semibold">
//                       {item.productId?.name}
//                     </h2>

//                     <p className="text-gray-400 mt-1">
//                       {item.productId?.category} /{" "}
//                       {item.productId?.subCategory}
//                     </p>

//                     <p className="text-green-400 font-bold mt-2 text-lg">
//                       ₹ {item.amount}
//                     </p>

//                     <p className="mt-2 text-sm text-gray-300">
//                       Size: {item.size}
//                     </p>
//                   </div>
//                 </div>

//                 {/* Delivery Info */}
//                 <div className="space-y-2 text-sm text-gray-300">
//                   <p>
//                     <span className="text-cyan-400 font-semibold">
//                       Name:
//                     </span>{" "}
//                     {item.name}
//                   </p>

//                   <p>
//                     <span className="text-cyan-400 font-semibold">
//                       Phone:
//                     </span>{" "}
//                     {item.phone}
//                   </p>

//                   <p>
//                     <span className="text-cyan-400 font-semibold">
//                       Address:
//                     </span>{" "}
//                     {item.address}
//                   </p>

//                   <p>
//                     <span className="text-cyan-400 font-semibold">
//                       Ordered On:
//                     </span>{" "}
//                     {new Date(item.createdAt).toLocaleDateString()}
//                   </p>

//                   <p className="text-yellow-400 font-semibold">
//                     Order Confirmed
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className="text-center text-xl text-gray-400">
//             No Orders Found
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Orders;

import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { userDataContext } from "../context/UserContext";
import { Link } from "react-router-dom";

function Orders() {
  const { user } = useContext(userDataContext);

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  /* =====================================
      FETCH ONLY CURRENT USER ORDERS
  ===================================== */
  const fetchOrders = async () => {
    try {
      if (!user?._id) {
        setLoading(false);
        return;
      }

      const res = await axios.get(
        ` /api/order/my-orders/${user._id}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        setOrders(res.data.orders);
      }
    } catch (error) {
      console.log(error);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [user]);

  /* =====================================
      LOADING
  ===================================== */
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f172a] text-white flex justify-center items-center text-2xl">
        Loading Orders...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f172a] text-white px-6 py-10">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <h1 className="text-4xl font-bold text-cyan-400 text-center mb-10">
          My Orders
        </h1>

        {/* IF NOT LOGGED IN */}
        {!user ? (
          <div className="text-center">
            <p className="text-xl text-gray-400 mb-5">
              Please login to view your orders
            </p>

            <Link
              to="/login"
              className="bg-cyan-500 px-6 py-3 rounded-xl hover:bg-cyan-600"
            >
              Login
            </Link>
          </div>
        ) : orders.length > 0 ? (
          <div className="space-y-6">
            {orders.map((item) => (
              <div
                key={item._id}
                className="bg-[#1e293b] rounded-2xl p-5 shadow-lg flex flex-col lg:flex-row justify-between gap-6"
              >
                {/* PRODUCT */}
                <div className="flex gap-5">
                  <img
                    src={item.productId?.image1}
                    alt={item.productId?.name}
                    className="w-28 h-28 object-cover rounded-xl"
                  />

                  <div>
                    <h2 className="text-xl font-bold line-clamp-2">
                      {item.productId?.name}
                    </h2>

                    <p className="text-gray-400 mt-1">
                      {item.productId?.category} /{" "}
                      {item.productId?.subCategory}
                    </p>

                    <p className="text-green-400 text-lg font-bold mt-2">
                      ₹ {item.amount}
                    </p>

                    <p className="text-sm mt-2">
                      Size: {item.size}
                    </p>

                    <p className="text-sm mt-1">
                      Qty: {item.quantity || 1}
                    </p>
                  </div>
                </div>

                {/* ORDER INFO */}
                <div className="space-y-2 text-sm text-gray-300">
                  <p>
                    <span className="text-cyan-400 font-semibold">
                      Name:
                    </span>{" "}
                    {item.name}
                  </p>

                  <p>
                    <span className="text-cyan-400 font-semibold">
                      Phone:
                    </span>{" "}
                    {item.phone}
                  </p>

                  <p>
                    <span className="text-cyan-400 font-semibold">
                      Address:
                    </span>{" "}
                    {item.address}
                  </p>

                  <p>
                    <span className="text-cyan-400 font-semibold">
                      Ordered On:
                    </span>{" "}
                    {new Date(item.createdAt).toLocaleDateString()}
                  </p>

                  <p className="text-yellow-400 font-semibold">
                    Order Placed Successfully
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* NO ORDERS */
          <div className="text-center">
            <p className="text-xl text-gray-400 mb-5">
              You have not placed any orders yet
            </p>

            <Link
              to="/collections"
              className="bg-cyan-500 px-6 py-3 rounded-xl hover:bg-cyan-600"
            >
              Start Shopping
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Orders;
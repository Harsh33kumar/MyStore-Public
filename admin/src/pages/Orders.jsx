import React, { useEffect, useState } from "react";
import axios from "axios";
import SideBar from "../components/SideBar";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    const res = await axios.get(" /api/order/all");
    setOrders(res.data.orders);
  };

  useEffect(() => {
    getOrders();
  }, []);

  const acceptOrder = async (id) => {
    await axios.put(` /api/order/accept/${id}`);
    getOrders();
  };

  const rejectOrder = async (id) => {
    await axios.put(` /api/order/reject/${id}`);
    getOrders();
  };

  const deleteOrder = async (id) => {
    await axios.delete(` /api/order/delete/${id}`);
    getOrders();
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-l from-[#141414] to-[#0c2025] text-white flex pt-16">

      {/* Sidebar */}
      <SideBar />

      {/* Main Content */}
      <div className="flex-1 ml-[260px] p-6">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold">Orders Management</h1>
          <p className="text-slate-400 mt-2">
            Manage all customer orders in one place
          </p>
        </div>

        {/* Orders Grid */}
        <div className="grid gap-6">
          {orders.map((item) => (
            <div
              key={item._id}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {/* Product */}
              <h2 className="text-2xl font-semibold text-cyan-400 mb-3">
                {item.productId?.name}
              </h2>

              {/* Details */}
              <div className="grid md:grid-cols-2 gap-3 text-slate-300">
                <p>
                  <span className="text-slate-400">Name:</span> {item.name}
                </p>
                <p>
                  <span className="text-slate-400">Phone:</span> {item.phone}
                </p>
                <p>
                  <span className="text-slate-400">Size:</span> {item.size}
                </p>
                <p>
                  <span className="text-slate-400">Amount:</span> ₹{item.amount}
                </p>
                <p className="md:col-span-2">
                  <span className="text-slate-400">Address:</span>{" "}
                  {item.address}
                </p>
              </div>

              {/* Status */}
              <div className="mt-4">
                <span
                  className={`px-4 py-1 rounded-full text-sm font-semibold ${
                    item.status === "Pending"
                      ? "bg-yellow-500/20 text-yellow-400"
                      : item.status === "Accepted"
                      ? "bg-green-500/20 text-green-400"
                      : "bg-red-500/20 text-red-400"
                  }`}
                >
                  {item.status}
                </span>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-3 mt-5">
                <button
                  onClick={() => acceptOrder(item._id)}
                  className="bg-green-500 hover:bg-green-600 transition px-5 py-2 rounded-xl font-medium"
                >
                  Accept
                </button>

                <button
                  onClick={() => rejectOrder(item._id)}
                  className="bg-yellow-500 hover:bg-yellow-600 transition px-5 py-2 rounded-xl font-medium"
                >
                  Reject
                </button>

                <button
                  onClick={() => deleteOrder(item._id)}
                  className="bg-red-500 hover:bg-red-600 transition px-5 py-2 rounded-xl font-medium"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Orders;
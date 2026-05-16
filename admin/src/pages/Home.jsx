import React from "react";
import { Link } from "react-router-dom";
import SideBar from "../components/SideBar";
import {
  Package,
  Users,
  ClipboardList,
  IndianRupee,
  TrendingUp,
  Star,
  Bell,
} from "lucide-react";

function Home() {
  const cards = [
    {
      title: "Total Products",
      value: "128",
      icon: <Package size={28} />,
      color: "from-blue-500 to-cyan-500",
      link: "/admin/products",
    },
    {
      title: "Total Orders",
      value: "54",
      icon: <ClipboardList size={28} />,
      color: "from-green-500 to-emerald-500",
      link: "/admin/orders",
    },
    {
      title: "Customers",
      value: "312",
      icon: <Users size={28} />,
      color: "from-purple-500 to-pink-500",
      link: "/admin/users",
    },
    {
      title: "Revenue",
      value: "₹48,900",
      icon: <IndianRupee size={28} />,
      color: "from-orange-500 to-yellow-500",
      link: "/admin/revenue",
    },
  ];

  const recentOrders = [
    {
      id: "#1001",
      customer: "Harsh Kumar",
      amount: "₹1,299",
      status: "Pending",
    },
    {
      id: "#1002",
      customer: "Rohit Sharma",
      amount: "₹2,499",
      status: "Delivered",
    },
    {
      id: "#1003",
      customer: "Aman Verma",
      amount: "₹999",
      status: "Accepted",
    },
    {
      id: "#1004",
      customer: "Priya Singh",
      amount: "₹3,299",
      status: "Pending",
    },
  ];

  const topProducts = [
    "Nike Shoes",
    "Smart Watch",
    "Wireless Earbuds",
    "Leather Jacket",
  ];

  return (
    <div className="w-full min-h-screen bg-gradient-to-l from-[#141414] to-[#0c2025] text-white flex pt-16">
      
      {/* Sidebar */}
      <SideBar />

      {/* Main Content */}
      <div className="flex-1 ml-[260px] p-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold">Admin Dashboard</h1>
            <p className="text-slate-400 mt-2">
              Manage your e-commerce store professionally
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button className="bg-slate-800 p-3 rounded-xl hover:bg-slate-700">
              <Bell size={20} />
            </button>

            <div className="bg-slate-800 px-4 py-3 rounded-xl">
              <p className="text-sm text-slate-400">Welcome</p>
              <p className="font-semibold">Admin</p>
            </div>
          </div>
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {cards.map((item, index) => (
            <Link
              key={index}
              to={item.link}
              className={`bg-gradient-to-r ${item.color} rounded-2xl p-5 shadow-lg hover:scale-105 transition duration-300`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">{item.title}</p>
                  <h2 className="text-3xl font-bold mt-2">{item.value}</h2>
                </div>
                <div>{item.icon}</div>
              </div>
            </Link>
          ))}
        </div>

        {/* Middle Section */}
        <div className="grid lg:grid-cols-3 gap-6 mb-10">
          
{/* Sales */}
<div className="lg:col-span-2 bg-slate-900 rounded-2xl p-6 shadow-lg border border-slate-800">
  
  {/* Header */}
  <div className="flex items-center justify-between mb-6">
    <div className="flex items-center gap-3">
      <div className="bg-green-500/20 p-3 rounded-xl">
        <TrendingUp className="text-green-400" size={22} />
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-white">
          Sales Overview
        </h2>
        <p className="text-sm text-slate-400">
          Weekly Revenue Performance
        </p>
      </div>
    </div>

    <button className="bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-xl text-sm">
      This Week
    </button>
  </div>

  {/* Stats */}
  <div className="grid grid-cols-2 gap-4 mb-8">
    <div className="bg-slate-800 rounded-xl p-4">
      <p className="text-slate-400 text-sm">Total Sales</p>
      <h3 className="text-2xl font-bold text-green-400 mt-1">
        ₹48,900
      </h3>
    </div>

    <div className="bg-slate-800 rounded-xl p-4">
      <p className="text-slate-400 text-sm">Growth</p>
      <h3 className="text-2xl font-bold text-cyan-400 mt-1">
        +18%
      </h3>
    </div>
  </div>

  {/* Graph */}
  <div className="h-64 flex items-end justify-between gap-4">
    {[
      { day: "Mon", value: 70 },
      { day: "Tue", value: 95 },
      { day: "Wed", value: 55 },
      { day: "Thu", value: 120 },
      { day: "Fri", value: 85 },
      { day: "Sat", value: 145 },
      { day: "Sun", value: 110 },
    ].map((item, i) => (
      <div
        key={i}
        className="flex flex-col items-center w-full"
      >
        <div className="w-full bg-slate-800 rounded-full h-52 flex items-end">
          <div
            className="w-full rounded-full bg-gradient-to-t from-green-500 to-cyan-400 hover:scale-105 transition-all duration-300"
            style={{
              height: `${item.value}px`,
            }}
          ></div>
        </div>

        <p className="text-sm text-slate-400 mt-3">
          {item.day}
        </p>
      </div>
    ))}
  </div>
</div>
          {/* Top Products */}
          <div className="bg-slate-900 rounded-2xl p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-5">
              <Star className="text-yellow-400" />
              <h2 className="text-2xl font-semibold">Top Products</h2>
            </div>

            <div className="space-y-4">
              {topProducts.map((item, index) => (
                <div
                  key={index}
                  className="bg-slate-800 px-4 py-3 rounded-xl"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-slate-900 rounded-2xl p-6 shadow-lg">
          <h2 className="text-2xl font-semibold mb-5">Recent Orders</h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="text-slate-400 border-b border-slate-700">
                <tr>
                  <th className="pb-3">Order ID</th>
                  <th className="pb-3">Customer</th>
                  <th className="pb-3">Amount</th>
                  <th className="pb-3">Status</th>
                </tr>
              </thead>

              <tbody>
                {recentOrders.map((order, index) => (
                  <tr
                    key={index}
                    className="border-b border-slate-800 hover:bg-slate-800"
                  >
                    <td className="py-4">{order.id}</td>
                    <td>{order.customer}</td>
                    <td>{order.amount}</td>
                    <td>
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          order.status === "Pending"
                            ? "bg-yellow-500/20 text-yellow-400"
                            : order.status === "Delivered"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-blue-500/20 text-blue-400"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-slate-500 mt-10 text-sm">
          © 2026 Admin Dashboard • E-commerce Panel
        </div>
      </div>
    </div>
  );
}

export default Home;
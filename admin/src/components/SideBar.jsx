import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { BiAddToQueue } from "react-icons/bi";
import { CiBoxList } from "react-icons/ci";
import { GrDeliver } from "react-icons/gr";
import { MdDashboard } from "react-icons/md";
import { MdAutoGraph } from "react-icons/md";

function SideBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      name: "Dashboard",
      icon: <MdDashboard size={22} />,
      path: "/",
    },
    {
      name: "Add Items",
      icon: <BiAddToQueue size={22} />,
      path: "/add",
    },
    {
      name: "List Items",
      icon: <CiBoxList size={22} />,
      path: "/lists",
    },
    {
      name: "View Orders",
      icon: <GrDeliver size={20} />,
      path: "/orders",
    },
    {
      name: "Bestsellers",
      icon: <MdAutoGraph size={20} />,
      path: "/bestsellers",
    }
  ];

  return (
    <div className="w-[260px] min-h-screen fixed left-0 top-0 bg-gradient-to-b from-[#0f172a] via-[#111827] to-[#1e293b] border-r border-slate-800 text-white shadow-2xl pt-16">

      {/* Logo */}
      <div className="px-6 py-8 border-b border-slate-800">
        <h1 className="text-3xl font-bold tracking-wide text-cyan-400">
          Admin Panel
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          E-commerce Dashboard
        </p>
      </div>

      {/* Menu */}
      <div className="px-4 py-6 space-y-3">
        {menuItems.map((item, index) => {
          const active = location.pathname === item.path;

          return (
            <div
              key={index}
              onClick={() => navigate(item.path)}
              className={`flex items-center gap-4 px-4 py-3 rounded-xl cursor-pointer transition-all duration-300 group
              ${
                active
                  ? "bg-cyan-500 text-white shadow-lg"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <span>{item.icon}</span>

              <p className="font-medium text-[15px]">
                {item.name}
              </p>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="absolute bottom-5 left-0 w-full px-4">
        <div className="bg-slate-800 rounded-xl px-4 py-3 text-center">
          <p className="text-sm text-slate-400">Logged in as</p>
          <h3 className="font-semibold text-cyan-400">Admin</h3>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
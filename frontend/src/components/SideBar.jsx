import React from "react";
import { Link, useLocation } from "react-router-dom";

function SideBar() {
  const location = useLocation();

  const menu = [
    { name: "Dashboard", path: "/" },
    { name: "Add Product", path: "/add" },
    { name: "Product List", path: "/lists" },
    { name: "Collections", path: "/collections" },
    { name: "Orders", path: "/orders" },
  ];

  return (
    <div className="fixed left-0 top-0 w-[250px] h-screen bg-[#1e293b] text-white shadow-2xl z-50">
      {/* Logo */}
      <div className="p-6 border-b border-gray-700">
        <h1 className="text-3xl font-bold text-cyan-400 tracking-wide">
          My Store
        </h1>

        <p className="text-sm text-gray-400 mt-1">
          Admin Panel
        </p>
      </div>

      {/* Menu */}
      <div className="p-4 space-y-3">
        {menu.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className={`block px-4 py-3 rounded-xl font-medium transition duration-300 ${
              location.pathname === item.path
                ? "bg-cyan-500 text-white"
                : "bg-[#0f172a] hover:bg-cyan-600"
            }`}
          >
            {item.name}
          </Link>
        ))}
      </div>

      {/* Bottom */}
      <div className="absolute bottom-0 left-0 w-full p-4 border-t border-gray-700">
        <button className="w-full bg-red-500 hover:bg-red-600 py-3 rounded-xl font-semibold">
          Logout
        </button>
      </div>
    </div>
  );
}

export default SideBar;
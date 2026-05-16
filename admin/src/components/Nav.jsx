
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import axios from "axios";
import { adminDataContext } from "../context/UserContext";

function Nav() {
  const navigate = useNavigate();
  const { getAdmin } = useContext(adminDataContext);

  const logout_handler = async () => {
    try {
      const result = await axios.post(
        " /api/auth/logout",
        {},
        { withCredentials: true }
      );

      console.log(result.data);
      getAdmin();
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const linkClass = ({ isActive }) =>
    `px-4 py-2 rounded-xl transition ${
      isActive
        ? "bg-cyan-500 text-white"
        : "text-slate-300 hover:bg-slate-800"
    }`;

  return (
    <div className="w-full h-16 bg-slate-950 border-b border-slate-800 flex items-center justify-between px-6 text-white fixed top-0 left-0 z-50">

      {/* Logo */}
      <Link to="/" className="text-2xl font-bold text-cyan-400">
        My-Store
      </Link>

      {/* Links */}
      <div className="flex items-center gap-4">

        <NavLink to="/" className={linkClass}>
          Home
        </NavLink>

        <NavLink to="/orders" className={linkClass}>
          Orders
        </NavLink>

        <NavLink to="/add" className={linkClass}>
          Add
        </NavLink>

        <NavLink to="/lists" className={linkClass}>
          Lists
        </NavLink>
        <NavLink to="/bestsellers" className={linkClass}>
          Bestsellers
        </NavLink>

        {/* Logout button (NOT NavLink) */}
        <button
          onClick={logout_handler}
          className="px-4 py-2 rounded-xl bg-red-500 hover:bg-red-600 transition"
        >
          Logout
        </button>

        <NavLink to="/login" className={linkClass}>
          Login
        </NavLink>
      </div>
    </div>
  );
}

export default Nav;
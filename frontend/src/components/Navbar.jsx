import React, { useContext, useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import axios from "axios";
import { userDataContext } from "../context/UserContext";
import { Menu, X } from "lucide-react";

function Navbar() {
  const { userData } = useContext(userDataContext);

  const [cartCount, setCartCount] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);

  /* =============================
      FETCH CART COUNT
  ============================= */
  const fetchCartCount = async () => {
    try {
      const res = await axios.get(
        " /api/cart/list",
        {
          withCredentials: true,
        }
      );

      setCartCount(res.data?.carts?.length || 0);
    } catch (error) {
      console.log("Cart error:", error);
    }
  };

  /* =====================================
      LOGOUT
  ===================================== */
  const handleLogout = async () => {
    try {
      await axios.post(
        " /api/auth/logout",
        {},
        {
          withCredentials: true,
        }
      );

      window.location.href = "/login";
    } catch (error) {
      console.log(error);
    }
  };

  /* =============================
      INITIAL LOAD
  ============================= */
  useEffect(() => {
    fetchCartCount();
  }, []);

  const navStyle = ({ isActive }) =>
    isActive
      ? "text-cyan-400 font-semibold"
      : "text-white hover:text-cyan-400 transition";

  return (
    <nav className="bg-[#0f172a] text-white shadow-lg sticky top-0 z-50">
      
      {/* TOP NAV */}
      <div className="flex items-center justify-between px-6 md:px-8 py-4">
        
        {/* LOGO */}
        <Link to="/" className="text-2xl md:text-3xl font-bold text-cyan-400">
          My Store
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex gap-6 items-center text-lg">
          <NavLink to="/" className={navStyle}>
            Home
          </NavLink>

          <NavLink to="/collections" className={navStyle}>
            Collections
          </NavLink>

          <NavLink to="/products" className={navStyle}>
            Products
          </NavLink>

          <NavLink to="/about" className={navStyle}>
            About
          </NavLink>

          <NavLink to="/contact" className={navStyle}>
            Contact
          </NavLink>

          {/* CART */}
          <NavLink
            to="/cart"
            className="relative hover:text-cyan-400 transition"
          >
            Cart

            {cartCount > 0 && (
              <span className="absolute -top-2 -right-4 bg-red-500 text-xs px-2 py-[2px] rounded-full">
                {cartCount}
              </span>
            )}
          </NavLink>

          {/* AUTH */}
          {userData?.email ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition"
            >
              Logout
            </button>
          ) : (
            <>
              <NavLink
                to="/signup"
                className="bg-purple-500 px-4 py-2 rounded-lg hover:bg-purple-600 transition"
              >
                Signup
              </NavLink>

              <NavLink
                to="/login"
                className="bg-cyan-500 px-4 py-2 rounded-lg hover:bg-cyan-600 transition"
              >
                Login
              </NavLink>
            </>
          )}
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setMobileMenu(!mobileMenu)}
          className="md:hidden"
        >
          {mobileMenu ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {mobileMenu && (
        <div className="md:hidden flex flex-col gap-4 px-6 pb-6 text-lg bg-[#0f172a] border-t border-gray-700">
          
          <NavLink
            to="/"
            className={navStyle}
            onClick={() => setMobileMenu(false)}
          >
            Home
          </NavLink>

          <NavLink
            to="/collections"
            className={navStyle}
            onClick={() => setMobileMenu(false)}
          >
            Collections
          </NavLink>

          <NavLink
            to="/products"
            className={navStyle}
            onClick={() => setMobileMenu(false)}
          >
            Products
          </NavLink>

          <NavLink
            to="/about"
            className={navStyle}
            onClick={() => setMobileMenu(false)}
          >
            About
          </NavLink>

          <NavLink
            to="/contact"
            className={navStyle}
            onClick={() => setMobileMenu(false)}
          >
            Contact
          </NavLink>

          {/* CART */}
          <NavLink
            to="/cart"
            className="relative hover:text-cyan-400 w-fit"
            onClick={() => setMobileMenu(false)}
          >
            Cart

            {cartCount > 0 && (
              <span className="absolute -top-2 -right-4 bg-red-500 text-xs px-2 py-[2px] rounded-full">
                {cartCount}
              </span>
            )}
          </NavLink>

          {/* AUTH */}
          {userData?.email ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition w-fit"
            >
              Logout
            </button>
          ) : (
            <div className="flex gap-3">
              <NavLink
                to="/signup"
                onClick={() => setMobileMenu(false)}
                className="bg-purple-500 px-4 py-2 rounded-lg hover:bg-purple-600 transition"
              >
                Signup
              </NavLink>

              <NavLink
                to="/login"
                onClick={() => setMobileMenu(false)}
                className="bg-cyan-500 px-4 py-2 rounded-lg hover:bg-cyan-600 transition"
              >
                Login
              </NavLink>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
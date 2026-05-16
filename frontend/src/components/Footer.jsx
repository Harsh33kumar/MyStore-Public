import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-[#0f172a] text-gray-300 border-t border-gray-800 mt-10">

      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-8">

        {/* ================= BRAND ================= */}
        <div>
          <h1 className="text-2xl font-bold text-cyan-400">
            My Store
          </h1>

          <p className="text-sm mt-3 text-gray-400 leading-6">
            Your one-stop destination for fashion, electronics,
            and lifestyle products at unbeatable prices.
          </p>
        </div>

        {/* ================= QUICK LINKS ================= */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-4">
            Quick Links
          </h2>

          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-cyan-400">
                Home
              </Link>
            </li>
            <li>
              <Link to="/collections" className="hover:text-cyan-400">
                Collections
              </Link>
            </li>
            <li>
              <Link to="/cart" className="hover:text-cyan-400">
                Cart
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-cyan-400">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* ================= CATEGORIES ================= */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-4">
            Categories
          </h2>

          <ul className="space-y-2 text-sm">
            <li className="hover:text-cyan-400 cursor-pointer">Men</li>
            <li className="hover:text-cyan-400 cursor-pointer">Women</li>
            <li className="hover:text-cyan-400 cursor-pointer">Electronics</li>
            <li className="hover:text-cyan-400 cursor-pointer">Accessories</li>
          </ul>
        </div>

        {/* ================= CONTACT ================= */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-4">
            Contact
          </h2>

          <p className="text-sm text-gray-400">
            Email: support@ecart.com
          </p>
          <p className="text-sm text-gray-400 mt-2">
            Phone: +91 98765 43210
          </p>
          <p className="text-sm text-gray-400 mt-2">
            India
          </p>

          {/* SOCIAL */}
<div className="flex gap-3 mt-4">

  {/* Facebook */}
  <div className="w-9 h-9 flex items-center justify-center bg-[#1e293b] rounded-full hover:bg-cyan-500 transition cursor-pointer">
    <FaFacebookF size={14} />
  </div>

  {/* Instagram */}
  <div className="w-9 h-9 flex items-center justify-center bg-[#1e293b] rounded-full hover:bg-cyan-500 transition cursor-pointer">
    <FaInstagram size={14} />
  </div>

  {/* Twitter */}
  <div className="w-9 h-9 flex items-center justify-center bg-[#1e293b] rounded-full hover:bg-cyan-500 transition cursor-pointer">
    <FaTwitter size={14} />
  </div>

</div>
        </div>

      </div>

      {/* ================= BOTTOM BAR ================= */}
      <div className="border-t border-gray-800 py-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} My Store. All rights reserved.
      </div>

    </footer>
  );
}

export default Footer;
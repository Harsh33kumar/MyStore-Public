
import React, { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { adminDataContext } from "../context/UserContext";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { getAdmin } = useContext(adminDataContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        " /api/admin/adminlogin",
        form,
        { withCredentials: true }
      );

      if (res.data.success) {
        alert("Login Successful");
        getAdmin();
        navigate("/");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Login Failed");
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#1e293b] flex items-center justify-center px-4">
      
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/10 rounded-3xl shadow-2xl p-8 text-white">
        
        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold">Admin Login</h1>
          <p className="text-slate-300 mt-2">
            Welcome back to your dashboard
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          
          <div>
            <label className="block text-sm mb-2 text-slate-300">
              Email Address
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
              className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-600 outline-none focus:border-cyan-400 transition"
            />
          </div>

          <div>
            <label className="block text-sm mb-2 text-slate-300">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
              className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-600 outline-none focus:border-cyan-400 transition"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-cyan-500 hover:bg-cyan-600 transition duration-300 py-3 rounded-xl font-semibold text-lg"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-slate-300 mt-6 text-sm">
          <NavLink
            to="/signup"
            className="text-cyan-400 hover:text-cyan-300"
          >
            Don't have an account? Sign Up
          </NavLink>
        </p>
      </div>
    </div>
  );
}

export default Login;
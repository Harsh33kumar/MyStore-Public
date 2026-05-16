import React, { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { userDataContext } from "../context/UserContext";

function Login() {
  const { getCurrentUser } = useContext(userDataContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        " /api/auth/login",
        form,
        { withCredentials: true }
      );

      if (res.data.success) {
        getCurrentUser();
        alert("Login Successful");
        navigate("/");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#0f172a] to-[#1e293b] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-[#1e293b] shadow-2xl rounded-2xl p-8 border border-gray-700">
        
        {/* Heading */}
        <h2 className="text-4xl font-bold text-center text-cyan-400 mb-2">
          Login
        </h2>

        <p className="text-center text-gray-400 mb-8">
          Welcome back to your account
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Email */}
          <input
            type="email"
            placeholder="Enter Email"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
            className="w-full bg-[#0f172a] border border-gray-600 p-3 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Enter Password"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
            className="w-full bg-[#0f172a] border border-gray-600 p-3 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-cyan-500 hover:bg-cyan-600 transition duration-300 py-3 rounded-xl font-semibold text-lg"
          >
            Login
          </button>

          {/* Signup Link */}
          <p className="text-center text-gray-400 mt-4">
            Don't have an account?{" "}
            <NavLink
              to="/signup"
              className="text-cyan-400 hover:text-cyan-300 font-medium"
            >
              Sign Up
            </NavLink>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
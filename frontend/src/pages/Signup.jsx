import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

function Signup() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, email, password } = form;

    if (!username || !email || !password) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const res = await axios.post(" /api/auth/signup", form);

      if (res.data.success) {
        alert("Signup Successful");
      } else {
        alert("Signup Failed");
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#0f172a] to-[#1e293b] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-[#1e293b] shadow-2xl rounded-2xl p-8 border border-gray-700">
        
        {/* Heading */}
        <h2 className="text-4xl font-bold text-center text-cyan-400 mb-2">
          Sign Up
        </h2>

        <p className="text-center text-gray-400 mb-8">
          Create your new account
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Username */}
          <input
            type="text"
            placeholder="Enter Username"
            value={form.username}
            onChange={(e) =>
              setForm({ ...form, username: e.target.value })
            }
            className="w-full bg-[#0f172a] border border-gray-600 p-3 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />

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

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-cyan-500 hover:bg-cyan-600 transition duration-300 py-3 rounded-xl font-semibold text-lg"
          >
            Sign Up
          </button>

          {/* Login Link */}
          <p className="text-center text-gray-400 mt-4">
            Already have an account?{" "}
            <NavLink
              to="/login"
              className="text-cyan-400 hover:text-cyan-300 font-medium"
            >
              Login
            </NavLink>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
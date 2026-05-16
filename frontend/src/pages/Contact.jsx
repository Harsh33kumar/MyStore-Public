import React, { useState } from "react";
import axios from "axios";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  /* =====================================
      HANDLE SUBMIT
  ===================================== */
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    setLoading(true);

    const res = await axios.post(
      " /api/contact/us",
      form
    );

    alert(res.data.message);

    setForm({
      name: "",
      email: "",
      subject: "",
      message: "",
    });

  } catch (error) {
    alert("Failed to send message");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-[#0f172a] text-white">

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 items-center">

        {/* LEFT */}
        <div>
          <p className="text-cyan-400 font-semibold text-lg mb-3">
            Get In Touch
          </p>

          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            Contact <span className="text-cyan-400">My Store</span>
          </h1>

          <p className="text-gray-400 mt-6 text-lg leading-8">
            Need help with your order, returns, payments, or products?
            Our support team is always ready to assist you.
          </p>

          <div className="mt-8 space-y-5">

            <div className="bg-[#1e293b] p-5 rounded-2xl">
              <h3 className="text-xl font-semibold">📧 Email</h3>
              <p className="text-gray-400 mt-2">
                support@mystore.com
              </p>
            </div>

            <div className="bg-[#1e293b] p-5 rounded-2xl">
              <h3 className="text-xl font-semibold">📞 Phone</h3>
              <p className="text-gray-400 mt-2">
                +91 98765 43210
              </p>
            </div>

            <div className="bg-[#1e293b] p-5 rounded-2xl">
              <h3 className="text-xl font-semibold">📍 Address</h3>
              <p className="text-gray-400 mt-2">
                Jalandhar, Punjab, India
              </p>
            </div>

          </div>
        </div>

        {/* RIGHT FORM */}
        <div className="bg-[#1e293b] rounded-3xl p-8 shadow-2xl">

          <h2 className="text-3xl font-bold mb-6 text-cyan-400">
            Send Message
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">

            <input
              type="text"
              placeholder="Your Name"
              required
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
              className="w-full p-4 rounded-xl bg-[#0f172a] border border-gray-600 outline-none focus:border-cyan-400"
            />

            <input
              type="email"
              placeholder="Your Email"
              required
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
              className="w-full p-4 rounded-xl bg-[#0f172a] border border-gray-600 outline-none focus:border-cyan-400"
            />

            <input
              type="text"
              placeholder="Subject"
              required
              value={form.subject}
              onChange={(e) =>
                setForm({ ...form, subject: e.target.value })
              }
              className="w-full p-4 rounded-xl bg-[#0f172a] border border-gray-600 outline-none focus:border-cyan-400"
            />

            <textarea
              rows="5"
              placeholder="Your Message"
              required
              value={form.message}
              onChange={(e) =>
                setForm({ ...form, message: e.target.value })
              }
              className="w-full p-4 rounded-xl bg-[#0f172a] border border-gray-600 outline-none focus:border-cyan-400 resize-none"
            ></textarea>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-cyan-500 py-4 rounded-xl text-lg font-semibold hover:bg-cyan-600 transition"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>

          </form>

          {status && (
            <p className="mt-5 text-green-400 text-center">
              {status}
            </p>
          )}
        </div>

      </section>

      {/* SUPPORT SECTION */}
      <section className="bg-[#111827] py-16 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 text-center">

          <div className="bg-[#1e293b] p-8 rounded-2xl">
            <div className="text-4xl mb-4">🚚</div>
            <h2 className="text-2xl font-bold">
              Order Support
            </h2>
            <p className="text-gray-400 mt-3">
              Help with shipping, delivery, and tracking.
            </p>
          </div>

          <div className="bg-[#1e293b] p-8 rounded-2xl">
            <div className="text-4xl mb-4">💳</div>
            <h2 className="text-2xl font-bold">
              Payment Help
            </h2>
            <p className="text-gray-400 mt-3">
              Issues with payment or refund process.
            </p>
          </div>

          <div className="bg-[#1e293b] p-8 rounded-2xl">
            <div className="text-4xl mb-4">🔁</div>
            <h2 className="text-2xl font-bold">
              Returns & Exchange
            </h2>
            <p className="text-gray-400 mt-3">
              Easy return assistance from our team.
            </p>
          </div>

        </div>
      </section>

    </div>
  );
}

export default Contact;
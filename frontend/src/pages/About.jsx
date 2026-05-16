import React from "react";
import { Link } from "react-router-dom";

function About() {
  return (
    <div className="min-h-screen bg-[#0f172a] text-white">

      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-10 items-center">
        {/* Left */}
        <div>
          <p className="text-cyan-400 font-semibold text-lg mb-3">
            Welcome To My Store
          </p>

          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            We Create <br />
            Better <span className="text-cyan-400">Shopping</span>
            <br /> Experiences
          </h1>

          <p className="text-gray-400 mt-6 text-lg leading-8">
            At My Store, we believe shopping should be simple,
            exciting, and affordable. We bring premium quality
            fashion, electronics, and lifestyle products right to
            your doorstep with trust and convenience.
          </p>

          <div className="mt-8 flex gap-4 flex-wrap">
            <Link
              to="/collections"
              className="bg-cyan-500 px-8 py-3 rounded-xl hover:bg-cyan-600 transition"
            >
              Shop Now
            </Link>

            <Link
              to="/contact"
              className="border border-cyan-400 px-8 py-3 rounded-xl hover:bg-cyan-500 transition"
            >
              Contact Us
            </Link>
          </div>
        </div>

        {/* Right */}
        <div>
          <img
            src="https://images.unsplash.com/photo-1607082349566-187342175e2f"
            alt="About Store"
            className="rounded-3xl shadow-2xl w-full h-[500px] object-cover"
          />
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="bg-[#111827] py-16 px-6">
        <div className="max-w-7xl mx-auto">

          <h1 className="text-4xl font-bold text-center text-cyan-400 mb-12">
            Why Choose Us
          </h1>

          <div className="grid md:grid-cols-3 gap-8">

            <div className="bg-[#1e293b] p-8 rounded-2xl text-center hover:scale-105 duration-300">
              <div className="text-5xl mb-4">🚚</div>
              <h2 className="text-2xl font-bold mb-3">
                Fast Delivery
              </h2>
              <p className="text-gray-400">
                Get your favorite products delivered quickly
                and safely to your home.
              </p>
            </div>

            <div className="bg-[#1e293b] p-8 rounded-2xl text-center hover:scale-105 duration-300">
              <div className="text-5xl mb-4">💎</div>
              <h2 className="text-2xl font-bold mb-3">
                Premium Quality
              </h2>
              <p className="text-gray-400">
                We carefully select top-quality products for
                long-lasting satisfaction.
              </p>
            </div>

            <div className="bg-[#1e293b] p-8 rounded-2xl text-center hover:scale-105 duration-300">
              <div className="text-5xl mb-4">🔒</div>
              <h2 className="text-2xl font-bold mb-3">
                Secure Payments
              </h2>
              <p className="text-gray-400">
                Shop with confidence using our trusted and
                secure payment methods.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* OUR STORY */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-10 items-center">

        <div>
          <img
            src="https://images.unsplash.com/photo-1556740749-887f6717d7e4"
            alt="Our Story"
            className="rounded-3xl shadow-2xl w-full h-[450px] object-cover"
          />
        </div>

        <div>
          <h1 className="text-4xl font-bold text-cyan-400 mb-6">
            Our Story
          </h1>

          <p className="text-gray-400 leading-8 text-lg">
            Started with a vision to simplify online shopping,
            My Store has grown into a trusted ecommerce platform
            serving thousands of happy customers.
          </p>

          <p className="text-gray-400 leading-8 text-lg mt-5">
            We focus on customer satisfaction, product quality,
            affordable pricing, and smooth shopping experiences.
            Every order matters to us.
          </p>
        </div>

      </section>

      {/* STATS */}
      <section className="bg-cyan-500 py-16 px-6 text-black">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8 text-center">

          <div>
            <h1 className="text-5xl font-bold">10K+</h1>
            <p className="mt-2 text-lg">Happy Customers</p>
          </div>

          <div>
            <h1 className="text-5xl font-bold">5K+</h1>
            <p className="mt-2 text-lg">Products Sold</p>
          </div>

          <div>
            <h1 className="text-5xl font-bold">100+</h1>
            <p className="mt-2 text-lg">Top Brands</p>
          </div>

          <div>
            <h1 className="text-5xl font-bold">24/7</h1>
            <p className="mt-2 text-lg">Support</p>
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 text-center">
        <h1 className="text-4xl font-bold">
          Ready To Start Shopping?
        </h1>

        <p className="text-gray-400 mt-4 text-lg">
          Explore our latest collections and amazing deals today.
        </p>

        <Link
          to="/collections"
          className="inline-block mt-8 bg-cyan-500 px-8 py-3 rounded-xl hover:bg-cyan-600"
        >
          Explore Products
        </Link>
      </section>

    </div>
  );
}

export default About;

import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { userDataContext } from "../context/UserContext";
import { Link } from "react-router-dom";
import Contact from '../pages/Contact'
import Scrollbar from "../components/Scrollbar";
import Footer from "../components/Footer";
import CategorySlider from "../components/CategorySlider";

function Home() {
  const { userData } = useContext(userDataContext);

  const [products, setProducts] = useState([]);

  /* =====================================
      FETCH FEATURED PRODUCTS
  ===================================== */
  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        " /api/product/list"
      );

      setProducts(res.data.products.slice(0, 8));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  /* =====================================
      TRIM LONG PRODUCT NAME
  ===================================== */
  const trimName = (name) => {
    return name.length > 32 ? name.slice(0, 32) + "..." : name;
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white">

      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <p className="text-cyan-400 text-lg font-semibold mb-3">
            Welcome {userData?.username ? userData.username : "to My Store"}
          </p>

          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            Shop Smart <br />
            Shop <span className="text-cyan-400">Better</span>
          </h1>

          <p className="text-gray-400 mt-6 text-lg leading-8">
            Discover premium fashion, electronics, lifestyle
            essentials and more — all at unbeatable prices.
          </p>

          <div className="flex gap-4 mt-8 flex-wrap">
            <Link
              to="/collections"
              className="bg-cyan-500 px-8 py-3 rounded-xl hover:bg-cyan-600 transition"
            >
              Shop Now
            </Link>

            <Link
              to="/cart"
              className="border border-cyan-400 px-8 py-3 rounded-xl hover:bg-cyan-500 transition"
            >
              View Cart
            </Link>
          </div>
        </div>

        <div>
          <img
            src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da"
            alt="shopping"
            className="rounded-3xl shadow-2xl w-full h-[500px] object-cover"
          />
        </div>
      </section>
      {/* Scrollbar */}
      <Scrollbar />

      {/* FEATURE SECTION */}
      <section className="bg-[#111827] py-14 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-6 text-center">

          <div className="bg-[#1e293b] p-6 rounded-2xl">
            <h3 className="text-3xl mb-2">🚚</h3>
            <h2 className="font-semibold text-xl">Free Shipping</h2>
            <p className="text-gray-400 mt-2">
              On orders above ₹999
            </p>
          </div>

          <div className="bg-[#1e293b] p-6 rounded-2xl">
            <h3 className="text-3xl mb-2">💳</h3>
            <h2 className="font-semibold text-xl">Secure Payment</h2>
            <p className="text-gray-400 mt-2">
              100% safe checkout
            </p>
          </div>

          <div className="bg-[#1e293b] p-6 rounded-2xl">
            <h3 className="text-3xl mb-2">🔁</h3>
            <h2 className="font-semibold text-xl">Easy Returns</h2>
            <p className="text-gray-400 mt-2">
              7 day return policy
            </p>
          </div>

          <div className="bg-[#1e293b] p-6 rounded-2xl">
            <h3 className="text-3xl mb-2">⭐</h3>
            <h2 className="font-semibold text-xl">Top Quality</h2>
            <p className="text-gray-400 mt-2">
              Trusted premium brands
            </p>
          </div>

        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold  text-cyan-400 mb-12">
          🛍️ Featured Products
        </h1>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((item) => (
            <div
              key={item._id}
              className="bg-[#1e293b] rounded-2xl overflow-hidden shadow-lg hover:scale-105 duration-300 flex flex-col h-full"
            >
              <img
                src={item.image1}
                alt={item.name}
                className="h-60 w-full object-cover"
              />

              <div className="p-4 flex flex-col flex-1">
                {/* Fixed Height Title */}
                <h2 className="text-xl font-semibold h-[56px] overflow-hidden">
                  {trimName(item.name)}
                </h2>

                <p className="text-gray-400 text-sm mt-1">
                  {item.category}
                </p>

                <p className="text-green-400 font-bold text-lg mt-3">
                  ₹ {item.price}
                </p>

                <Link
                  to={`/product/${item._id}`}
                  className="block mt-auto text-center bg-cyan-500 py-2 rounded-lg hover:bg-cyan-600"
                >
                  View Product
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
            {/* CATEGORY SLIDER */}
      <CategorySlider />

        <Contact />

      {/* CTA */}
      <section className="bg-cyan-500 py-16 px-6 text-center text-black">
        <h1 className="text-4xl font-bold">
          Ready to Grab the Best Deals?
        </h1>

        <p className="mt-4 text-lg">
          Join thousands of happy customers shopping daily.
        </p>


        <Link
          to="/collections"
          className="inline-block mt-6 bg-black text-white px-8 py-3 rounded-xl hover:bg-gray-900"
        >
          Start Shopping
        </Link>
      </section>
      

    </div>
  );
}

export default Home;


import React, { useEffect, useState } from "react";
import axios from "axios";

const Scrollbar = () => {
  const [products, setProducts] = useState([]);

  /* =========================
     FETCH PRODUCTS
  ========================= */
  const fetchProducts = async () => {
    try {
      const res = await axios.get(" /api/product/list");
      setProducts(res.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const bestSellers = products.filter((p) => p.bestSeller);
  const trimName = (name, max = 22) => {
    if (!name) return "";
    return name.length > max ? name.slice(0, max) + "..." : name;
  };

  return (
    <section className="max-w-7xl mx-auto px-6 py-14">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-cyan-400">
          🔥 Bestseller Picks
        </h2>

        <span className="text-xs bg-cyan-500/20 text-cyan-300 px-3 py-1 rounded-full">
          Trending Now
        </span>
      </div>

      {/* SUB TEXT */}
      <p className="text-gray-400 mb-6">
        Top-rated products loved by our customers
      </p>

      {/* HORIZONTAL SCROLL */}
      <div className="flex gap-5 overflow-x-auto scrollbar-hide pb-4">
        {bestSellers.length > 0 ? (
          bestSellers.map((item) => (
            <div
              key={item._id}
              className="min-w-[230px] bg-[#1e293b] rounded-2xl overflow-hidden shadow-lg hover:shadow-cyan-500/20 hover:scale-[1.03] transition-all duration-300 flex-shrink-0 border border-gray-800"
            >
              {/* IMAGE */}
              <div className="relative">
                <img
                  src={item.image1}
                  // alt={item.name}
                  alt={"image not found"}
                  className="w-full h-44 object-cover"
                />

                {/* BADGE */}
                <span className="absolute top-3 left-3 bg-green-500 text-black text-[10px] font-bold px-2 py-1 rounded-full">
                  BESTSELLER
                </span>
              </div>

              {/* CONTENT */}
              <div className="p-4 flex flex-col gap-2">
                <h3 className="text-white font-semibold text-sm leading-snug">
                  {trimName(item.name, 24)}
                </h3>

                <p className="text-gray-400 text-xs">{item.category}</p>

                {/* PRICE + BUTTON */}
                <div className="flex items-center justify-between mt-2">
                  <span className="text-green-400 font-bold">
                    ₹ {item.price}
                  </span>

                  {/* <button className="bg-cyan-500 hover:bg-cyan-600 text-white text-xs px-3 py-1 rounded-lg transition">
                    View
                  </button> */}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-gray-400 text-sm">
            No Bestseller Products Available
          </div>
        )}
      </div>
    </section>
  );
};

export default Scrollbar;

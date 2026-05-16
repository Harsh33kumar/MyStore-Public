import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";

function CategorySlider() {
  const [products, setProducts] = useState([]);

  /* =========================
     FETCH PRODUCTS
  ========================= */
  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        " /api/product/list"
      );
      setProducts(res.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  /* =========================
     BESTSELLERS ONLY
  ========================= */
  const bestSellers = useMemo(() => {
    return products.filter((p) => p.bestSeller);
  }, [products]);

  /* =========================
     GROUP BY CATEGORY
  ========================= */
  const categoryWise = useMemo(() => {
    return bestSellers.reduce((acc, item) => {
      const cat = item.category || "Others";
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(item);
      return acc;
    }, {});
  }, [bestSellers]);

  /* =========================
     TRIM NAME
  ========================= */
  const trimName = (name, max = 55) => {
    if (!name) return "";
    return name.length > max ? name.slice(0, max) + "..." : name;
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">

      {/* HEADER */}
      <h2 className="text-3xl font-bold text-cyan-400 mb-2">
        🏷️ Shop by Category
      </h2>

      <p className="text-gray-400 mb-8">
        Explore bestselling products across categories
      </p>

      {/* CATEGORY SLIDERS */}
      {Object.entries(categoryWise).map(([category, items]) => (
        <div key={category} className="mb-10">

          {/* CATEGORY TITLE */}
          <h3 className="text-xl font-semibold text-white mb-4 border-l-4 border-cyan-500 pl-3">
            {category}
          </h3>

          {/* HORIZONTAL SLIDER */}
          <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-3">

            {items.map((item) => (
<div
  key={item._id}
  className="min-w-[260px] w-[260px] bg-[#1e293b] rounded-xl overflow-hidden shadow-md hover:shadow-cyan-500/20 hover:scale-[1.03] transition-all duration-300 flex-shrink-0 flex flex-col"
>

  {/* IMAGE */}
  <img
    src={item.image1}
    alt={item.name}
    className="w-full aspect-[4/3] object-cover"
  />

  {/* CONTENT */}
  <div className="p-3 flex flex-col flex-1">

    <p className="text-white text-sm font-semibold">
      {trimName(item.name)}
    </p>

    {/* <p className="text-gray-400 text-xs mt-1">
      Bestseller
    </p> */}

    {/* PUSH TO BOTTOM */}
    <div className="mt-auto flex items-center justify-between pt-3">

      <span className="text-green-400 font-bold text-sm">
        ₹{item.price}
      </span>

      {/* <button className="text-xs bg-cyan-500 hover:bg-cyan-600 px-2 py-1 rounded-md transition">
        View
      </button> */}

    </div>
  </div>
</div>
            ))}

          </div>
        </div>
      ))}
    </div>
  );
}

export default CategorySlider;
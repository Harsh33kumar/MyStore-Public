import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Collections() {
const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");

  /* =====================================
      FETCH FILTERED PRODUCTS
  ===================================== */
  const fetchProducts = async () => {
    try {
      let url = " /api/product/list?";

      if (category) url += `category=${category}&`;
      if (subCategory) url += `subCategory=${subCategory}&`;
      if (search) url += `search=${search}`;

      const res = await axios.get(url);
      setProducts(res.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  /* =====================================
      FETCH ALL PRODUCTS
  ===================================== */
  const fetchAllProducts = async () => {
    try {
      const res = await axios.get(" /api/product/list");
      setAllProducts(res.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  /* =====================================
      DYNAMIC CATEGORY
  ===================================== */
  const categories = useMemo(() => {
    return [...new Set(allProducts.map((item) => item.category))];
  }, [allProducts]);

  /* =====================================
      DYNAMIC SUBCATEGORY
  ===================================== */
  const subCategories = useMemo(() => {
    if (!category) return [];

    return [
      ...new Set(
        allProducts
          .filter((item) => item.category === category)
          .map((item) => item.subCategory)
      ),
    ];
  }, [allProducts, category]);
  
    /* =====================================
      TRIM LONG PRODUCT NAME
  ===================================== */
  const trimName = (name) => {
    return name.length > 32 ? name.slice(0, 32) + "..." : name;
  };

  useEffect(() => {
    fetchProducts();
  }, [category, subCategory]);

  useEffect(() => {
    fetchAllProducts();
  }, []);

  return (
    <div className="min-h-screen bg-[#0f172a] text-white px-6 py-10">
      {/* Heading */}
      <h1 className="text-4xl font-bold text-center text-cyan-400 mb-10">
        Our Collections
      </h1>

      {/* Search */}
      <div className="max-w-3xl mx-auto mb-8">
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Search product..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 p-3 rounded-lg bg-[#1e293b] border border-gray-600 outline-none"
          />

          <button
            onClick={fetchProducts}
            className="bg-cyan-500 px-6 rounded-lg hover:bg-cyan-600"
          >
            Search
          </button>
        </div>
      </div>

      {/* Category Filter */}
      <div className="max-w-6xl mx-auto mb-10">
        <div className="flex flex-wrap gap-3 mb-4">
          <button
            onClick={() => {
              setCategory("");
              setSubCategory("");
              fetchProducts();
            }}
            className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600"
          >
            All
          </button>

          {categories.map((cat, i) => (
            <button
              key={i}
              onClick={() => {
                setCategory(cat);
                setSubCategory("");
              }}
              className={`px-4 py-2 rounded-lg ${
                category === cat
                  ? "bg-cyan-500"
                  : "bg-[#1e293b] hover:bg-gray-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Sub Categories */}
        {category && (
          <div className="flex flex-wrap gap-3">
            {subCategories.map((sub, i) => (
              <button
                key={i}
                onClick={() => setSubCategory(sub)}
                className={`px-4 py-2 rounded-lg ${
                  subCategory === sub
                    ? "bg-green-500"
                    : "bg-gray-700 hover:bg-gray-600"
                }`}
              >
                {sub}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.length > 0 ? (
          products.map((item) => (
            <div
              key={item._id}
              className="bg-[#1e293b] rounded-2xl shadow-lg overflow-hidden hover:scale-105 duration-300"
            >
              <img
                src={item.image1}
                alt={item.name}
                className="h-60 w-full object-cover"
              />

              <div className="p-4">
                <h2 className="text-xl font-semibold h-[56px] overflow-hidden">
                  {trimName(item.name)}
                </h2>

                <p className="text-gray-400 text-sm mt-1">
                  {item.category} / {item.subCategory}
                </p>

                <p className="text-green-400 text-lg font-bold mt-3">
                  ₹ {item.price}
                </p>

<button
  onClick={() => navigate(`/product/${item._id}`)}
  className="mt-4 w-full bg-cyan-500 py-2 rounded-lg hover:bg-cyan-600"
>
  View Product
</button>
              </div>
            </div>
          ))
        ) : (
          <h2 className="text-center col-span-full text-xl text-gray-400">
            No Products Found
          </h2>
        )}
      </div>
    </div>
  );
}

export default Collections;
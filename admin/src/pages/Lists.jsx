import React, { useEffect, useMemo, useState, } from "react";
import axios from "axios";
import SideBar from "../components/SideBar";
import { useNavigate } from "react-router-dom";


function Lists() {
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
const navigate = useNavigate();


  /* ======================================
      FETCH PRODUCTS
  ====================================== */
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

  /* ======================================
      FETCH ALL PRODUCTS
      Used for Dynamic Categories
  ====================================== */
  const fetchAllProducts = async () => {
    try {
      const res = await axios.get(" /api/product/list");
      setAllProducts(res.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  /* ======================================
      DELETE PRODUCT
  ====================================== */
  const deleteProduct = async (id) => {
    try {
      await axios.delete(` /api/product/delete/${id}`);
      alert("Product Deleted");

      fetchProducts();
      fetchAllProducts();
    } catch (error) {
      console.log(error);
    }
  };

  /* ======================================
      DYNAMIC CATEGORY LIST
  ====================================== */
  const categories = useMemo(() => {
    return [...new Set(allProducts.map((item) => item.category))];
  }, [allProducts]);

  /* ======================================
      DYNAMIC SUBCATEGORY LIST
  ====================================== */
  const subCategories = useMemo(() => {
    if (!category) return [];

    return [
      ...new Set(
        allProducts
          .filter((item) => item.category === category)
          .map((item) => item.subCategory),
      ),
    ];
  }, [allProducts, category]);

  useEffect(() => {
    fetchProducts();
  }, [category, subCategory]);

  useEffect(() => {
    fetchAllProducts();
  }, []);

  return (
    <div className="flex min-h-screen bg-[#0f172a] text-white pt-16">
      {/* Sidebar */}
      <SideBar />

      {/* Main Content */}
      <div className="flex-1 ml-[250px] p-6">
        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by name or category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-3 rounded-lg bg-[#1e293b] border border-gray-600"
          />

          <button
            onClick={fetchProducts}
            className="mt-3 bg-cyan-500 px-6 py-2 rounded-lg hover:bg-cyan-600"
          >
            Search
          </button>
        </div>

        <div className="flex gap-6">
          {/* Category Sidebar */}
          <div className="w-[220px] bg-[#1e293b] p-4 rounded-xl h-fit">
            <h2 className="text-xl font-bold mb-4 text-cyan-400">Categories</h2>

            {categories.map((cat, index) => (
              <div key={index}>
                {/* Category */}
                <button
                  onClick={() => {
                    setCategory(cat);
                    setSubCategory("");
                  }}
                  className={`block w-full text-left p-2 rounded mb-2 ${
                    category === cat
                      ? "bg-cyan-500"
                      : "bg-[#0f172a] hover:bg-gray-700"
                  }`}
                >
                  {cat}
                </button>

                {/* Sub Category */}
                {category === cat &&
                  subCategories.map((sub, i) => (
                    <button
                      key={i}
                      onClick={() => setSubCategory(sub)}
                      className={`ml-4 mt-1 block w-full text-left p-2 rounded text-sm ${
                        subCategory === sub
                          ? "bg-green-500"
                          : "bg-gray-700 hover:bg-gray-600"
                      }`}
                    >
                      {sub}
                    </button>
                  ))}
              </div>
            ))}

            {/* Clear */}
            <button
              onClick={() => {
                setCategory("");
                setSubCategory("");
                setSearch("");
                fetchProducts();
              }}
              className="mt-4 w-full bg-red-500 py-2 rounded"
            >
              Clear Filter
            </button>
          </div>

          {/* Products */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 flex-1">
            {products.length > 0 ? (
              products.map((item) => (
                <div
                  key={item._id}
                  className="bg-[#1e293b] rounded-xl p-4 shadow-lg"
                >
                  <img
                    src={item.image1}
                    alt={item.name}
                    className="h-48 w-full object-cover rounded-lg"
                  />

                  <h2 className="text-xl font-bold mt-3">{item.name}</h2>

                  <p className="text-gray-300 mt-1">
                    {item.category} / {item.subCategory}
                  </p>

                  <p className="text-green-400 font-semibold mt-2">
                    ₹ {item.price}
                  </p>

                  <div className="flex gap-3 mt-4">
                    <button
                      onClick={() => navigate(`/update/${item._id}`)}
                      className="flex-1 bg-yellow-500 py-2 rounded hover:bg-yellow-600"
                    >
                      Update
                    </button>

                    <button
                      onClick={() => deleteProduct(item._id)}
                      className="flex-1 bg-red-500 py-2 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <h2>No Products Found</h2>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Lists;

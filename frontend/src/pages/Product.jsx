
import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { userDataContext } from "../context/UserContext";
import { useContext } from "react";

function Product() {
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const { userData, getCurrentUser } = useContext(userDataContext);


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
  ====================================== */
  const fetchAllProducts = async () => {
    try {
      const res = await axios.get(
        " /api/product/list"
      );
      setAllProducts(res.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  /* ======================================
      ADD TO CART FUNCTION
  ====================================== */
  const addToCartProduct = async (productId) => {
    try {
      await axios.post(
        " /api/cart/add",
        {
          userId: userData._id, 
          userName: userData.username,
          userEmail: userData.email,
          productId,
          quantity: 1,
          size, // default size
        },
        { withCredentials: true }
      );

      alert("Product Added To Cart");
    } catch (error) {
      console.log(error);
      alert("Failed To Add Cart");
    }
  };

  /* ======================================
      DELETE PRODUCT
  ====================================== */
  const deleteProduct = async (id) => {
    try {
      await axios.delete(
        ` /api/product/delete/${id}`
      );

      alert("Product Deleted");

      fetchProducts();
      fetchAllProducts();
    } catch (error) {
      console.log(error);
    }
  };

  /* ======================================
      CATEGORY LIST
  ====================================== */
  const categories = useMemo(() => {
    return [...new Set(allProducts.map((item) => item.category))];
  }, [allProducts]);

  /* ======================================
      SUBCATEGORY LIST
  ====================================== */
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
    getCurrentUser();
  }, [category, subCategory]);

  useEffect(() => {
    fetchAllProducts();
    console.log("User in Product page:", userData);
  }, []);

  return (
    <div className="flex min-h-screen bg-[#0f172a] text-white">

      {/* Main */}
      <div className="flex-1 ml-[250px] p-6">

        {/* SEARCH */}
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

          {/* SIDEBAR */}
          <div className="w-[220px] bg-[#1e293b] p-4 rounded-xl h-fit">
            <h2 className="text-xl font-bold mb-4 text-cyan-400">
              Categories
            </h2>

            {categories.map((cat, index) => (
              <div key={index}>
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

            {/* CLEAR */}
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

          {/* PRODUCTS */}
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

                <h2 className="text-xl font-semibold h-[56px] overflow-hidden">
                  {trimName(item.name)}
                </h2>

                  <p className="text-gray-300 mt-1">
                    {item.category} / {item.subCategory}
                  </p>

                  <p className="text-green-400 font-semibold mt-2">
                    ₹ {item.price}
                  </p>

                  <div className="flex gap-3 mt-4">

                    <button
                      onClick={() =>
                        addToCartProduct(item._id)
                      }
                      className="flex-1 bg-cyan-500 py-2 rounded hover:bg-cyan-600"
                    >
                      Add To Cart
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

export default Product;
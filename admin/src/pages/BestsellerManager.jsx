import React, { useEffect, useState, useMemo, useCallback } from "react";
import axios from "axios";
import SideBar from "../components/SideBar";

const API = " /api/product";

function BestsellerManager() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  /* =========================
     FETCH PRODUCTS
  ========================= */
  const fetchProducts = useCallback(async () => {
    try {
      const res = await axios.get(`${API}/list`);
      setProducts(res.data.products);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  /* =========================
     TOGGLE BESTSELLER
  ========================= */
  const toggleBestSeller = useCallback(async (id, value) => {
    try {
      await axios.put(`${API}/update/${id}`, {
        bestSeller: value,
      });

      setProducts((prev) =>
        prev.map((p) => (p._id === id ? { ...p, bestSeller: value } : p)),
      );
    } catch (error) {
      console.log(error);
    }
  }, []);

  /* =========================
     DERIVED DATA (OPTIMIZED)
  ========================= */

  const bestSellers = useMemo(() => {
    return products.filter((p) => p.bestSeller);
  }, [products]);

  const categoryWiseBestSellers = useMemo(() => {
    return bestSellers.reduce((acc, item) => {
      const cat = item.category || "Uncategorized";

      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(item);

      return acc;
    }, {});
  }, [bestSellers]);

  /* =========================
     RENDER HELPERS
  ========================= */
  const renderProductCard = (item) => (
    <div key={item._id} className="bg-[#0f172a] p-3 rounded-lg">
      <img
        src={item.image1}
        alt={item.name}
        className="h-32 w-full object-cover rounded"
      />

      <h3 className="mt-2 font-semibold">{item.name}</h3>

      <div className="flex items-center gap-2 mt-2">
        <input
          type="checkbox"
          checked={item.bestSeller}
          onChange={(e) => toggleBestSeller(item._id, e.target.checked)}
        />
        <span className="text-sm">Bestseller</span>
      </div>
    </div>
  );

  const renderSmallCard = (item) => (
    <div
      key={item._id}
      className="flex items-center gap-3 bg-[#0f172a] p-2 rounded"
    >
      <img src={item.image1} className="w-12 h-12 object-cover rounded" />

      <div className="flex-1">
        <p className="text-sm">{item.name}</p>
      </div>

      <input
        type="checkbox"
        checked={item.bestSeller}
        onChange={(e) => toggleBestSeller(item._id, e.target.checked)}
      />
    </div>
  );

  // searching products by name
  
  const filteredProducts = useMemo(() => {
    const keyword = search.toLowerCase().trim();

    if (!keyword) return products;

    return products.filter((p) => p.name.toLowerCase().includes(keyword));
  }, [products, search]);

  return (
    <div className="flex min-h-screen bg-[#0f172a] text-white pt-16">
      <SideBar />

      {/* MAIN AREA */}
      <div className="flex-1 ml-[250px] p-6 space-y-6">
        <input
          type="text"
          placeholder="Search for Products by Name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full mb-4 p-2 rounded bg-[#0f172a] border border-gray-600 text-white outline-none focus:border-cyan-400"
        />
        {search.trim() && (
          <div className="bg-[#1e293b] p-4 rounded-xl mb-6">
            <h2 className="text-2xl font-bold text-yellow-400 mb-4">
              Search Results
            </h2>

            {filteredProducts.length ? (
              <div className="space-y-3 max-h-[40vh] overflow-y-auto pr-2">
                {filteredProducts.map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center gap-4 bg-[#0f172a] p-3 rounded-lg"
                  >
                    {/* IMAGE */}
                    <img
                      src={item.image1}
                      alt={"image not found"}
                      className="w-14 h-14 object-cover rounded"
                    />

                    {/* NAME */}
                    <div className="flex-1">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-xs text-gray-400">{item.category}</p>
                      <p className="text-lg font-bold text-green-400">
                        ${item.price.toFixed(2)}
                      </p>
                      {/* <p className="text-sm text-gray-400">
                        {item.description}
                      </p> */}
                      <p className="text-sm text-gray-400">{item.bestSeller ? "Bestseller" : "Not a Bestseller"}</p>
                    </div>

                    {/* CHECKBOX */}
                    <input
                      type="checkbox"
                      checked={item.bestSeller}
                      onChange={(e) =>
                        toggleBestSeller(item._id, e.target.checked)
                      }
                    />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 text-sm">
                No products found for "{search}"
              </p>
            )}
          </div>
        )}
        {/* TOP SECTION */}
        <div className="grid grid-cols-3 gap-6">
          {/* LEFT: ALL PRODUCTS */}
          <div className="col-span-2 bg-[#1e293b] p-4 rounded-xl h-[80vh] flex flex-col">
            <h2 className="text-2xl font-bold text-cyan-400 mb-4">
              All Products
            </h2>

            <div className="grid grid-cols-2 gap-4 overflow-y-auto pr-2">
              {products.map(renderProductCard)}
            </div>
          </div>

          {/* RIGHT: BESTSELLERS (STICKY PANEL) */}
          <div className="bg-[#1e293b] p-4 rounded-xl h-[80vh] sticky top-20 flex flex-col">
            <h2 className="text-2xl font-bold text-green-400 mb-4">
              Bestseller Products
            </h2>

            <div className="space-y-3 overflow-y-auto pr-2">
              {bestSellers.length ? (
                bestSellers.map(renderSmallCard)
              ) : (
                <p className="text-gray-400 text-sm">No Bestseller Products</p>
              )}
            </div>
          </div>
        </div>

        {/* ================= CATEGORY SECTION ================= */}
        <div className="bg-[#1e293b] p-4 rounded-xl">
          <h2 className="text-2xl font-bold text-green-400 mb-4">
            Category-wise Bestseller Products
          </h2>

          <div className="space-y-6">
            {Object.entries(categoryWiseBestSellers).map(
              ([category, items]) => (
                <div key={category} className="bg-[#0f172a] p-3 rounded-lg">
                  {/* CATEGORY HEADER */}
                  <h3 className="text-xl font-semibold text-cyan-400 mb-3">
                    {category}
                  </h3>

                  {/* SCROLL LIST */}
                  <div className="space-y-3 max-h-[250px] overflow-y-auto pr-2">
                    {items.map(renderSmallCard)}
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    </div>
  );

  //   return (
  //     <div className="flex min-h-screen bg-[#0f172a] text-white pt-16">
  //       <SideBar />

  //       <div className="flex-1 ml-[250px] p-6 grid grid-cols-3 gap-6">

  //         {/* ================= LEFT ================= */}
  //         <div className="col-span-2 bg-[#1e293b] p-4 rounded-xl">
  //           <h2 className="text-2xl font-bold text-cyan-400 mb-4">
  //             All Products
  //           </h2>

  //           <div className="grid grid-cols-2 gap-4 max-h-[80vh] overflow-y-auto">
  //             {products.map(renderProductCard)}
  //           </div>
  //         </div>

  //         {/* ================= RIGHT ================= */}
  //         <div className="bg-[#1e293b] p-4 rounded-xl">
  //           <h2 className="text-2xl font-bold text-green-400 mb-4">
  //             Bestseller Products
  //           </h2>

  //           <div className="space-y-3 max-h-[80vh] overflow-y-auto">
  //             {bestSellers.length
  //               ? bestSellers.map(renderSmallCard)
  //               : (
  //                 <p className="text-gray-400 text-sm">
  //                   No Bestseller Products
  //                 </p>
  //               )}
  //           </div>
  //         </div>
  //       </div>

  //       {/* ================= CATEGORY SECTION ================= */}
  //       <div className="w-full p-6">
  //         <h2 className="text-2xl font-bold text-green-400 mb-4">
  //           Category-wise Bestseller Products
  //         </h2>

  //         {Object.entries(categoryWiseBestSellers).map(
  //           ([category, items]) => (
  //             <div key={category} className="mb-6">
  //               <h3 className="text-xl font-semibold text-cyan-400 mb-2">
  //                 {category}
  //               </h3>

  //               <div className="space-y-3 max-h-[40vh] overflow-y-auto">
  //                 {items.map(renderSmallCard)}
  //               </div>
  //             </div>
  //           )
  //         )}
  //       </div>
  //     </div>
  //   );
}

export default BestsellerManager;

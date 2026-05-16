

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Cart() {
  const navigate = useNavigate();

  const [items, setItems] = useState([]);

  /* =====================================
      FETCH CART ITEMS
  ===================================== */
const fetchCart = async () => {
  try {
    const res = await axios.get(
      " /api/cart/list",
      { withCredentials: true }
    );

    setItems(res.data.carts);
  } catch (error) {
    console.log(error);
  }
};

  /* =====================================
      REMOVE ITEM
  ===================================== */
const removeItem = async (id) => {
  try {
    await axios.delete(
      ` /api/cart/delete/${id}`,
      { withCredentials: true }
    );

    fetchCart();
  } catch (error) {
    console.log(error);
  }
};
  /* =====================================
      BUY NOW
  ===================================== */
  const buyNow = (item) => {
    navigate("/buy-now", {
      state: {
        product: item.productId,
        size: item.size,
      },
    });
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <div className="p-10 bg-[#0f172a] min-h-screen text-white">
      <h1 className="text-4xl mb-8 font-bold text-cyan-400">
        Cart
      </h1>

      {items.length > 0 ? (
        items.map((item) => (
          <div
            key={item._id}
            className="bg-[#1e293b] p-5 rounded-xl mb-4 flex justify-between items-center"
          >
            {/* LEFT SIDE */}
            <div className="flex items-center gap-5">
              <img
                src={item.productId.image1}
                alt={item.productId.name}
                className="w-24 h-24 object-cover rounded-lg"
              />

              <div>
                <h2 className="text-xl font-semibold">
                  {item.productId.name}
                </h2>

                <p className="text-gray-400">
                  Size: {item.size}
                </p>

                <p className="text-green-400 font-bold mt-1">
                  ₹ {item.productId.price}
                </p>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="flex gap-3">
              <button
                onClick={() => buyNow(item)}
                className="bg-green-500 px-5 py-2 rounded hover:bg-green-600"
              >
                Buy Now
              </button>

              <button
                onClick={() => removeItem(item._id)}
                className="bg-red-500 px-5 py-2 rounded hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          </div>
        ))
      ) : (
        <h2 className="text-xl text-gray-400">
          Your Cart is Empty
        </h2>
      )}
    </div>
  );
}

export default Cart;
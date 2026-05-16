

import React, { useState } from "react";
import axios from "axios";
import SideBar from "../components/SideBar";

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    image1: null,
    image2: null,
    image3: null,
    image4: null,
    description: "",
    price: "",
    category: "",
    subCategory: "",
    sizes: [],
    bestSeller: false,
  });

  const [sizeInput, setSizeInput] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle text + checkbox inputs
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setProduct((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle file inputs
  const handleImageChange = (e) => {
    const { name, files } = e.target;

    if (files && files[0]) {
      setProduct((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    }
  };

  // Convert sizes string to array
  const handleSizes = () => {
    const sizesArray = sizeInput
      .split(",")
      .map((size) => size.trim())
      .filter((size) => size !== "");

    setProduct((prev) => ({
      ...prev,
      sizes: sizesArray,
    }));
  };

  // Submit product
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (product.sizes.length === 0) {
      alert("Please add sizes first");
      return;
    }

    const formData = new FormData();

    formData.append("name", product.name);
    formData.append("image1", product.image1);
    formData.append("image2", product.image2);
    formData.append("image3", product.image3);
    formData.append("image4", product.image4);
    formData.append("description", product.description);
    formData.append("price", product.price);
    formData.append("category", product.category);
    formData.append("subCategory", product.subCategory);
    formData.append("sizes", JSON.stringify(product.sizes));
    formData.append("bestSeller", product.bestSeller);

    try {
      setLoading(true);

      const res = await axios.post(
        " /api/product/add",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert(res.data.message || "Product Added Successfully");

      // Reset form
      setProduct({
        name: "",
        image1: null,
        image2: null,
        image3: null,
        image4: null,
        description: "",
        price: "",
        category: "",
        subCategory: "",
        sizes: [],
        bestSeller: false,
      });

      setSizeInput("");
    } catch (error) {
      console.log(error);
      alert(
        error.response?.data?.message || "Failed to Add Product"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen min-h-screen bg-gradient-to-l from-[#141414] to-[#0c2025] text-white flex pt-16">
      <SideBar />

      <div className="flex-1 flex justify-center items-center p-6 ml-[250px]">
        <div className="w-full max-w-3xl bg-[#1e293b] shadow-2xl rounded-2xl p-8 border border-gray-700">
          <h2 className="text-3xl font-bold text-center text-cyan-400 mb-6">
            Add Product
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Product Name */}
            <input
              type="text"
              name="name"
              placeholder="Product Name"
              value={product.name}
              onChange={handleChange}
              className="w-full bg-[#0f172a] border border-gray-600 p-3 rounded-lg"
              required
            />

            {/* Images */}
            {["image1", "image2", "image3", "image4"].map((img, index) => (
              <div key={img}>
                <label className="block mb-1 text-sm text-gray-300">
                  Select Image {index + 1}
                </label>

                <input
                  type="file"
                  name={img}
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full bg-[#0f172a] border border-gray-600 p-2 rounded-lg"
                  required
                />

                {product[img] && (
                  <p className="text-sm text-green-400 mt-1">
                    {product[img].name}
                  </p>
                )}
              </div>
            ))}

            {/* Description */}
            <textarea
              name="description"
              placeholder="Description"
              rows="4"
              value={product.description}
              onChange={handleChange}
              className="w-full bg-[#0f172a] border border-gray-600 p-3 rounded-lg"
              required
            />

            {/* Price */}
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={product.price}
              onChange={handleChange}
              className="w-full bg-[#0f172a] border border-gray-600 p-3 rounded-lg"
              required
            />

            {/* Category */}
            <input
              type="text"
              name="category"
              placeholder="Category"
              value={product.category}
              onChange={handleChange}
              className="w-full bg-[#0f172a] border border-gray-600 p-3 rounded-lg"
              required
            />

            {/* Sub Category */}
            <input
              type="text"
              name="subCategory"
              placeholder="Sub Category"
              value={product.subCategory}
              onChange={handleChange}
              className="w-full bg-[#0f172a] border border-gray-600 p-3 rounded-lg"
              required
            />

            {/* Sizes */}
            <div>
              <input
                type="text"
                placeholder="Sizes (S,M,L,XL)"
                value={sizeInput}
                onChange={(e) => setSizeInput(e.target.value)}
                className="w-full bg-[#0f172a] border border-gray-600 p-3 rounded-lg"
              />

              <button
                type="button"
                onClick={handleSizes}
                className="mt-2 bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg"
              >
                Add Sizes
              </button>

              <p className="mt-2 text-sm text-gray-300">
                Sizes: {product.sizes.join(", ")}
              </p>
            </div>

            {/* Bestseller */}
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="bestSeller"
                checked={product.bestSeller}
                onChange={handleChange}
              />
              Bestseller
            </label>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-cyan-500 hover:bg-cyan-600 py-3 rounded-lg font-semibold"
            >
              {loading ? "Saving..." : "Save Product"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
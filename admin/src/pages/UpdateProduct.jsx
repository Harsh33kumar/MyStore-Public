

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import SideBar from "../components/SideBar";

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    subCategory: "",
    sizes: [],
    bestSeller: false,
  });

  const [sizeInput, setSizeInput] = useState("");
  const [loading, setLoading] = useState(false);

  const [images, setImages] = useState({
    image1: null,
    image2: null,
    image3: null,
    image4: null,
  });

  const [preview, setPreview] = useState({});
  const [removeImages, setRemoveImages] = useState({});
  const [imageLoading, setImageLoading] = useState({});

  /* =========================
     FETCH PRODUCT
  ========================= */
  const fetchProduct = async () => {
    try {
      const res = await axios.get(
        ` /api/product/single/${id}`
      );

      const data = res.data.product;

      setProduct({
        name: data.name,
        description: data.description,
        price: data.price,
        category: data.category,
        subCategory: data.subCategory,
        sizes: data.sizes || [],
        bestSeller: data.bestSeller,
      });

      setSizeInput(data.sizes.join(", "));

      // preview images
      setPreview({
        image1: data.image1?.url || data.image1,
        image2: data.image2?.url || data.image2,
        image3: data.image3?.url || data.image3,
        image4: data.image4?.url || data.image4,
      });

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  /* =========================
     HANDLE INPUT
  ========================= */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setProduct((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  /* =========================
     HANDLE SIZES
  ========================= */
  const handleSizes = () => {
    const sizesArray = sizeInput
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    setProduct((prev) => ({
      ...prev,
      sizes: sizesArray,
    }));
  };

  /* =========================
     IMAGE CHANGE
  ========================= */
  const handleImageChange = (e) => {
    const { name, files } = e.target;

    if (files[0]) {
      setImageLoading((prev) => ({ ...prev, [name]: true }));

      setImages((prev) => ({
        ...prev,
        [name]: files[0],
      }));

      const url = URL.createObjectURL(files[0]);

      setPreview((prev) => ({
        ...prev,
        [name]: url,
      }));

      setRemoveImages((prev) => ({
        ...prev,
        [name]: false,
      }));

      // simulate loading (for UX)
      setTimeout(() => {
        setImageLoading((prev) => ({ ...prev, [name]: false }));
      }, 500);
    }
  };

  /* =========================
     REMOVE IMAGE
  ========================= */
  const handleRemoveImage = (key) => {
    setRemoveImages((prev) => ({
      ...prev,
      [key]: true,
    }));

    setPreview((prev) => ({
      ...prev,
      [key]: null,
    }));

    setImages((prev) => ({
      ...prev,
      [key]: null,
    }));
  };

  /* =========================
     UPDATE PRODUCT
  ========================= */
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const formData = new FormData();

      Object.keys(product).forEach((key) => {
        if (key === "sizes") {
          formData.append("sizes", JSON.stringify(product.sizes));
        } else {
          formData.append(key, product[key]);
        }
      });

      // images
      Object.keys(images).forEach((key) => {
        if (images[key]) {
          formData.append(key, images[key]);
        }
      });

      // remove flags
      Object.keys(removeImages).forEach((key) => {
        if (removeImages[key]) {
          formData.append(`remove_${key}`, true);
        }
      });

      await axios.put(
        ` /api/product/update/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Product Updated");
      navigate("/lists");

    } catch (error) {
      console.log(error);
      alert("Update Failed");
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     DELETE PRODUCT
  ========================= */
  const handleDelete = async () => {
    if (!window.confirm("Delete this product?")) return;

    await axios.delete(
      ` /api/product/delete/${id}`
    );

    navigate("/lists");
  };

  return (
    <div className="flex min-h-screen bg-[#0f172a] text-white pt-16">
      <SideBar />

      <div className="flex-1 ml-[250px] p-6 flex justify-center">
        <div className="w-full max-w-2xl bg-[#1e293b] p-6 rounded-xl">

          <h2 className="text-2xl font-bold text-cyan-400 mb-6">
            Update Product
          </h2>

          <form onSubmit={handleUpdate} className="space-y-4">

            <input
              name="name"
              value={product.name}
              onChange={handleChange}
              className="w-full p-3 bg-[#0f172a] rounded"
            />

            {/* IMAGES */}
            <div className="grid grid-cols-2 gap-4">
              {["image1", "image2", "image3", "image4"].map((img) => (
                <div key={img} className="bg-[#0f172a] p-2 rounded">

                  {imageLoading[img] ? (
                    <div className="h-32 flex items-center justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                    </div>
                  ) : preview[img] ? (
                    <img
                      src={preview[img]}
                      className="h-32 w-full object-cover rounded"
                    />
                  ) : (
                    <p className="text-gray-400 text-sm">No Image</p>
                  )}

                  <input
                    type="file"
                    name={img}
                    onChange={handleImageChange}
                    className="mt-2 text-sm"
                  />

                  <button
                    type="button"
                    onClick={() => handleRemoveImage(img)}
                    className="mt-2 w-full bg-red-500 text-sm py-1 rounded"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <textarea
              name="description"
              value={product.description}
              onChange={handleChange}
              className="w-full p-3 bg-[#0f172a] rounded h-[200px]"
            />

            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              className="w-full p-3 bg-[#0f172a] rounded"
            />

            <input
              name="category"
              value={product.category}
              onChange={handleChange}
              className="w-full p-3 bg-[#0f172a] rounded"
            />

            <input
              name="subCategory"
              value={product.subCategory}
              onChange={handleChange}
              className="w-full p-3 bg-[#0f172a] rounded"
            />

            <input
              value={sizeInput}
              onChange={(e) => setSizeInput(e.target.value)}
              className="w-full p-3 bg-[#0f172a] rounded"
            />

            <button
              type="button"
              onClick={handleSizes}
              className="bg-green-500 px-3 py-1 rounded"
            >
              Update Sizes
            </button>

            <label className="flex gap-2">
              <input
                type="checkbox"
                name="bestSeller"
                checked={product.bestSeller}
                onChange={handleChange}
              />
              Bestseller
            </label>

            <div className="flex gap-4">
              <button className="flex-1 bg-cyan-500 py-2 rounded">
                {loading ? "Updating..." : "Update"}
              </button>

              <button
                type="button"
                onClick={handleDelete}
                className="flex-1 bg-red-500 py-2 rounded"
              >
                Delete
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;
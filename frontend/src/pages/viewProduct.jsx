// // import React, { useEffect, useState } from "react";
// // import axios from "axios";
// // import { useParams } from "react-router-dom";

// // function ViewProduct() {
// //   const { id } = useParams();

// //   const [product, setProduct] = useState(null);
// //   const [mainImage, setMainImage] = useState("");

// //   const fetchProduct = async () => {
// //     try {
// //       const res = await axios.get(
// //         `/apiproduct/view/${id}`
// //       );

// //       setProduct(res.data.product);
// //       setMainImage(res.data.product.image1);
// //     } catch (error) {
// //       console.log(error);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchProduct();
// //   }, [id]);

// //   if (!product) {
// //     return (
// //       <div className="min-h-screen bg-[#0f172a] text-white flex justify-center items-center text-2xl">
// //         Loading...
// //       </div>
// //     );
// //   }

// //   const images = [
// //     product.image1,
// //     product.image2,
// //     product.image3,
// //     product.image4,
// //   ];

// //   return (
// //     <div className="min-h-screen bg-[#0f172a] text-white px-6 py-10">
// //       <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10">
// //         {/* Left Images */}
// //         <div>
// //           <img
// //             src={mainImage}
// //             alt={product.name}
// //             className="w-full h-[500px] object-cover rounded-2xl"
// //           />

// //           <div className="grid grid-cols-4 gap-3 mt-4">
// //             {images.map((img, i) => (
// //               <img
// //                 key={i}
// //                 src={img}
// //                 alt=""
// //                 onClick={() => setMainImage(img)}
// //                 className="h-24 w-full object-cover rounded-lg cursor-pointer border-2 border-transparent hover:border-cyan-400"
// //               />
// //             ))}
// //           </div>
// //         </div>

// //         {/* Right Content */}
// //         <div>
// //           <h1 className="text-4xl font-bold text-cyan-400">
// //             {product.name}
// //           </h1>

// //           <p className="mt-3 text-gray-400 text-lg">
// //             {product.category} / {product.subCategory}
// //           </p>

// //           <p className="mt-5 text-3xl font-bold text-green-400">
// //             ₹ {product.price}
// //           </p>

// //           <p className="mt-6 text-gray-300 leading-7">
// //             {product.description}
// //           </p>

// //           {/* Sizes */}
// //           <div className="mt-6">
// //             <h3 className="text-lg font-semibold mb-3">
// //               Available Sizes
// //             </h3>

// //             <div className="flex gap-3 flex-wrap">
// //               {product.sizes?.map((size, i) => (
// //                 <button
// //                   key={i}
// //                   className="px-5 py-2 bg-[#1e293b] rounded-lg hover:bg-cyan-500"
// //                 >
// //                   {size}
// //                 </button>
// //               ))}
// //             </div>
// //           </div>

// //           {/* Buttons */}
// //           <div className="mt-8 flex gap-4">
// //             <button className="bg-cyan-500 px-8 py-3 rounded-lg hover:bg-cyan-600">
// //               Add To Cart
// //             </button>

// //             <button className="bg-green-500 px-8 py-3 rounded-lg hover:bg-green-600">
// //               Buy Now
// //             </button>
// //           </div>

// //           {/* Bestseller */}
// //           {product.bestSeller && (
// //             <p className="mt-6 text-yellow-400 font-semibold">
// //               ⭐ Bestseller Product
// //             </p>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // export default ViewProduct;


// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams, useNavigate } from "react-router-dom";

// function ViewProduct() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [product, setProduct] = useState(null);
//   const [mainImage, setMainImage] = useState("");
//   const [size, setSize] = useState("");

//   const fetchProduct = async () => {
//     const res = await axios.get(
//       `/apiproduct/view/${id}`
//     );

//     setProduct(res.data.product);
//     setMainImage(res.data.product.image1);
//   };

//   useEffect(() => {
//     fetchProduct();
//   }, [id]);

//   const addToCart = async () => {
//     if (!size) return alert("Select Size");

//     await axios.post("/apicart/add", {
//       productId: product._id,
//       size,
//       quantity: 1,
//     });

//     alert("Added To Cart");
//   };

//   const buyNow = () => {
//     if (!size) return alert("Select Size");

//     navigate("/buy-now", {
//       state: {
//         product,
//         size,
//       },
//     });
//   };

//   if (!product) return <h1>Loading...</h1>;

//   const images = [
//     product.image1,
//     product.image2,
//     product.image3,
//     product.image4,
//   ];

//   return (
//     <div className="min-h-screen bg-[#0f172a] text-white p-10">
//       <div className="grid md:grid-cols-2 gap-10">

//         {/* Images */}
//         <div>
//           <img
//             src={mainImage}
//             className="w-full h-[500px] object-cover rounded-xl"
//           />

//           <div className="grid grid-cols-4 gap-3 mt-4">
//             {images.map((img, i) => (
//               <img
//                 key={i}
//                 src={img}
//                 onClick={() => setMainImage(img)}
//                 className="h-24 rounded cursor-pointer"
//               />
//             ))}
//           </div>
//         </div>

//         {/* Details */}
//         <div>
//           <h1 className="text-4xl font-bold">{product.name}</h1>

//           <p className="mt-4 text-green-400 text-3xl">
//             ₹ {product.price}
//           </p>

//           <p className="mt-6">{product.description}</p>

//           {/* Sizes */}
//           <div className="mt-6">
//             <h2 className="mb-3">Select Size</h2>

//             <div className="flex gap-3">
//               {product.sizes.map((item, i) => (
//                 <button
//                   key={i}
//                   onClick={() => setSize(item)}
//                   className={`px-5 py-2 rounded ${
//                     size === item
//                       ? "bg-cyan-500"
//                       : "bg-[#1e293b]"
//                   }`}
//                 >
//                   {item}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Buttons */}
//           <div className="flex gap-4 mt-8">
//             <button
//               onClick={addToCart}
//               className="bg-cyan-500 px-8 py-3 rounded"
//             >
//               Add To Cart
//             </button>

//             <button
//               onClick={buyNow}
//               className="bg-green-500 px-8 py-3 rounded"
//             >
//               Buy Now
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ViewProduct;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { userDataContext } from "../context/UserContext";
import { useContext } from "react";

function ViewProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { userData, getCurrentUser } = useContext(userDataContext);

  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [size, setSize] = useState("");

  /* =====================================
      FETCH PRODUCT
  ===================================== */
  const fetchProduct = async () => {
    try {
      const res = await axios.get(
        ` /api/product/view/${id}`
      );

      setProduct(res.data.product);
      setMainImage(res.data.product.image1);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProduct();
    getCurrentUser();
  }, [id]);

  /* =====================================
      ADD TO CART
  ===================================== */
  // const addToCart = async ({productId}) => {
  //   if (!size) return alert("Select Size");

  //   try {
  //     await axios.post(
  //       " /api/cart/add",
  //       {
  //         userId: userData._id, 
  //         userName: userData.username,
  //         userEmail: userData.email,
  //         productId,
  //         quantity: 1,
  //         size: "M", // default size
  //       },
  //       { withCredentials: true }
  //     );

  //     alert("Product Added To Cart");
  //   } catch (error) {
  //     console.log(error);
  //     alert("Failed To Add Cart");
  //   }
  // };

  const addToCart = async ({ productId }) => {

  if (!userData) {
    return navigate("/login");
  }

  if (!size) {
    return alert("Select Size");
  }

  try {
    await axios.post(
      " /api/cart/add",
      {
        userId: userData._id,
        userName: userData.username,
        userEmail: userData.email,
        productId,
        quantity: 1,
        size,
      },
      {
        withCredentials: true,
      }
    );

    alert("Product Added To Cart");

  } catch (error) {
    console.log(error);
    alert(error.response?.data?.message || "Failed To Add Cart");
  }
};
  /* =====================================
      BUY NOW
  ===================================== */
  const buyNow = () => {
    if (!size) return alert("Select Size");

    navigate("/buy-now", {
      state: { product, size },
    });
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-[#0f172a] text-white flex justify-center items-center text-2xl">
        Loading...
      </div>
    );
  }

  const images = [
    product.image1,
    product.image2,
    product.image3,
    product.image4,
  ].filter(Boolean);

  return (
    <div className="min-h-screen bg-[#0f172a] text-white px-6 py-10">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12">

        {/* LEFT SIDE IMAGES */}
        <div>
          {/* Main Image */}
          <div className="bg-white rounded-2xl overflow-hidden">
            <img
              src={mainImage}
              alt={product.name}
              className="w-full h-[500px] object-contain p-4"
            />
          </div>

          {/* Thumbnails */}
          <div className="grid grid-cols-4 gap-3 mt-4">
            {images.map((img, i) => (
              <div
                key={i}
                onClick={() => setMainImage(img)}
                className={`bg-white rounded-xl overflow-hidden cursor-pointer border-2 ${
                  mainImage === img
                    ? "border-cyan-500"
                    : "border-transparent"
                }`}
              >
                <img
                  src={img}
                  alt=""
                  className="w-full h-24 object-contain p-2"
                />
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE DETAILS */}
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl font-bold text-cyan-400 leading-tight">
            {product.name}
          </h1>

          <p className="mt-3 text-gray-400 text-lg">
            {product.category} / {product.subCategory}
          </p>

          <p className="mt-5 text-3xl font-bold text-green-400">
            ₹ {product.price}
          </p>

          <p className="mt-6 text-gray-300 leading-7">
            {/* {product.description} */}
                {product.description
      ?.split(/(?=🌸|🧵|👗|🎉|💫)/) // split from emoji points
      .map((line, index) => (
        <div
          key={index}
          className="bg-[#1e293b] p-3 rounded-lg"
        >
          {line.trim()}
        </div>
      ))}
          </p>

          {/* Sizes */}
          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-3">
              Select Size
            </h2>

            <div className="flex gap-3 flex-wrap">
              {product.sizes?.map((item, i) => (
                <button
                  key={i}
                  onClick={() => setSize(item)}
                  className={`px-5 py-2 rounded-lg transition ${
                    size === item
                      ? "bg-cyan-500"
                      : "bg-[#1e293b] hover:bg-[#334155]"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-10 flex-wrap">
            <button
              onClick={()=>{
                addToCart({productId: product._id});
              }}
              className="bg-cyan-500 px-8 py-3 rounded-lg hover:bg-cyan-600"
            >
              Add To Cart
            </button>

            <button
              onClick={buyNow}
              className="bg-green-500 px-8 py-3 rounded-lg hover:bg-green-600"
            >
              Buy Now
            </button>
          </div>

          {/* Bestseller */}
          {product.bestSeller && (
            <p className="mt-6 text-yellow-400 font-semibold">
              ⭐ Bestseller Product
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ViewProduct;
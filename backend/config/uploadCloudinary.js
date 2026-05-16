// uploadCloudinary.js
const cloudinary = require("cloudinary").v2;

const uploadCloudinary = async (filePath) => {
  const result = await cloudinary.uploader.upload(filePath, {
    folder: "products",
  });

  return {
    url: result.secure_url,
    public_id: result.public_id,
  };
};

module.exports = uploadCloudinary;
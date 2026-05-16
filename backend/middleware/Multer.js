
// const multer = require("multer");
// const path = require("path");

// // Storage Config
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./public");
//   },

//   filename: function (req, file, cb) {
//     const uniqueName =
//       Date.now() + "-" + Math.round(Math.random() * 1e9);

//     cb(null, uniqueName + path.extname(file.originalname));
//   },
// });

// // Accept ALL image types
// const fileFilter = (req, file, cb) => {
//   console.log("FILE TYPE:", file.mimetype);

//   if (file.mimetype.startsWith("image")) {
//     cb(null, true);
//   } else {
//     cb(new Error("Only image files are allowed"), false);
//   }
// };

// const upload = multer({
//   storage,
//   fileFilter,
// });

// module.exports = upload;
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: "./public",
  filename: function (req, file, cb) {
    cb(
      null,
      Date.now() + "-" + Math.round(Math.random() * 1e9) +
        path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage });

module.exports = upload;
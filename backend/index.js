const express = require('express');
const app = express();

const cors = require('cors');
app.use(
  cors({
    origin: ["http://localhost:5173","http://localhost:5174"], // Allow requests from both frontend and admin
    credentials: true
  })
);

const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT || 5000;

const connectDB = require('./db/db_conn');// Connect to MongoDB
const cookieParser = require('cookie-parser');
app.use(cookieParser());
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const admRoutes = require('./routes/admRoutes');
const ProductRoutes = require('./routes/productRoutes');
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const contactRoutes = require("./routes/contactRoutes");

app.use(express.json());// Middleware to parse JSON bodies


//Routing
app.get('/',(req,res)=>{
    return res.send('This is My store Backend Routing...');
})

// user routes
app.use("/api/auth",authRoutes); // Authentication routes (login, signup,logout etc.)
app.use("/api/cart", cartRoutes); // Cart routes (add to cart, get cart items, etc.)

// admin routes
app.use("/api/admin",admRoutes) // Admin routes (admin login, admin dashboard, etc.)

// common rotes for both user and admin to get current user or admin
app.use("/api/user",userRoutes); // User routes (get current user, update user profile, etc.)
app.use("/api/product",ProductRoutes); // Product routes (add product, get products, etc.)
app.use("/api/order", orderRoutes); // Order routes (place order, get user orders, verify the user order etc.)


//  contact route
app.use("/api/contact", contactRoutes); // Contact route (send contact message to admin)

const paymentRoutes = require("./routes/paymentRoutes");

app.use("/api/payment", paymentRoutes);

//listening to the server
app.listen(PORT, () => {
  console.log('HELLO USER WELCOME TO My Store BACKEND');
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});

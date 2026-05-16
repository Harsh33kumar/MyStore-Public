import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Navbar from "./components/Navbar"
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Product from './pages/Product';
import Collections from './pages/Collections'
import Orders from './pages/Orders'
import ViewProduct from './pages/viewProduct';
import Cart from './pages/Cart';
import BuyNow from './pages/BuyNow';

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path='/products' element={<Product />} />
        <Route path='/collections' element={<Collections />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path='/orders' element={<Orders />} />
        <Route path="/product/:id" element={<ViewProduct />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/buy-now" element={<BuyNow />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App

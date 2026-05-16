import { Route, Routes } from "react-router-dom";
import "./App.css";
import Nav from "./components/Nav";
import Add from "./pages/Add";
import Home from "./pages/Home";
import Lists from "./pages/Lists";
import Login from "./pages/Login";
import Orders from "./pages/Orders";
import BestsellerManager from "./pages/BestsellerManager";
import { useContext } from "react";
import { adminDataContext } from "./context/UserContext";
import UpdateProduct from "./pages/UpdateProduct";


function App() {
  let {adminData}= useContext(adminDataContext);
  return (
    <>
{!adminData ? <Login />: <>
<Nav />
      <Routes>
        
        <Route path="/" element={ <Home /> } />
        <Route path="/add" element={ <Add /> } />
        <Route path="/lists" element={ <Lists /> } />
        <Route path="/update/:id" element={<UpdateProduct />} />
        <Route path="/login" element={ <Login /> } />
        <Route path="/orders" element={ <Orders /> } />
        <Route path="/bestsellers" element={ <BestsellerManager /> } />
      </Routes>  
      </>
}

    </>
  );
}

export default App;

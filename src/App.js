import React, { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./component/Header/Navbar";
import NewNavbar from "./component/NewNavbar/NewNavbar";
import MainComponent from "./component/Home/MainComponent";
import Footer from "./component/Footer/Footer";
import SignIn from "./component/SignUp_SignIn/SignIn";
import SignUP from "./component/SignUp_SignIn/SignUP";
import { Routes, Route } from "react-router-dom";
import Cart from "./component/cart/Cart";
import Buynow from "./component/buynow/Buynow";
import CircularProgress from "@mui/material/CircularProgress";
// const BASE_URL = process.env.BASE_URL;

function App() {
  const [data, setData] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setData(true);
    }, 2000);
  }, []);

  return (
    <>
      {data ? (
        <>
          <Navbar />
          <NewNavbar />
          <Routes>
            <Route path="https://amazon-backend-izck.onrender.com/" element={<MainComponent />} />
            <Route path="https://amazon-backend-izck.onrender.com/login" element={<SignIn />} />
            <Route path="https://amazon-backend-izck.onrender.com/register" element={<SignUP />} />
            <Route path="https://amazon-backend-izck.onrender.com/getproductsone/:id" element={<Cart />} />
            <Route path="https://amazon-backend-izck.onrender.com/buynow" element={<Buynow />} />
          </Routes>
          <Footer />
        </>
      ) : (
        <div className="circle">
          <CircularProgress/>
          <h2>Loading...</h2>
        </div>
      )}
    </>
  );
}

export default App;

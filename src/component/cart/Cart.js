import React, { useEffect, useState, useContext } from "react";
import "./cart.css";
import { Divider } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { LoginContext } from "../context/ContextProvider";
import CircularProgress from "@mui/material/CircularProgress";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Cart = () => {
  const { id } = useParams(" ");

  const history = useNavigate("");

  const { account, setAccount } = useContext(LoginContext);

  const [individualData, setIndividualData] = useState("");
  // console.log(individualData);

  const getIndividualData = async () => {
    const res = await fetch(`/getproductsone/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    // console.log(data);

    if (res.status !== 201) {
      console.log("no data available");
    } else {
      // console.log("getdata");
      setIndividualData(data);
    }
  };

  useEffect(() => {
    setTimeout(getIndividualData, 1000);
  });

  // // Add cart function
  const addtocart = async (id) => {
    const checkres = await fetch(`/addcart/${id}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        individualData,
      }),
      credentials: "include",
    });
    // console.log(checkres.status + "checkres");

    const data1 = await checkres.json();
    // console.log(data1 + "frontend data");

    if (checkres.status === 401 || !data1) {
      // alert("User Invalid");
      // console.log("User Invalid");
      toast.warn("User Invalid ", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      // alert("data added in your cart");
      toast.success("Item Added in your Cart ", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      history("/buynow");
      setAccount(data1);
    }
  };

  return (
    <>
      <div className="cart_section">
        {individualData && Object.keys(individualData).length && (
          <div className="cart_container">
            <div className="left_cart">
              <img src={individualData.url} alt="cart_img" />
              <div className="cart_btn">
                <button
                  className="cart_btn1"
                  onClick={() => {
                    account ? addtocart(individualData.id) : history("/login");
                  }}
                >
                  Add to Cart
                </button>
                <button
                  className="cart_btn2"
                  onClick={() => {
                    account ? history("/buynow") : history("/login");
                  }}
                >
                  Buy Now
                </button>
              </div>
            </div>
            <div className="right_cart">
              <h3>{individualData.title.shortTitle}</h3>
              <h4>{individualData.title.longTitle}</h4>
              <Divider />
              <p className="mrp">M.R.P. : ₹ {individualData.price.mrp}</p>
              <p>
                Deal of the Day :
                <span style={{ color: "#B12704" }}>
                  ₹ {individualData.price.cost}.00
                </span>
              </p>
              <p>
                You Save :
                <span style={{ color: "#B12704" }}>
                  ₹ {individualData.price.mrp - individualData.price.cost} (
                  {individualData.price.discount})
                </span>
              </p>
              <div className="discount_box">
                <h5>
                  Discount:{" "}
                  <span style={{ color: "#111" }}>
                    {individualData.price.discount}
                  </span>
                </h5>
                <h4>
                  Free Delivery:{" "}
                  <span style={{ color: "#111" }}>MAY 8- 23</span> Details
                </h4>
                <p>
                  Fastest delivery:{" "}
                  <span style={{ color: "#111", fontWeight: 600 }}>
                    Tomorrow 11AM
                  </span>
                </p>
              </div>
              <p className="description">
                About the Item:{" "}
                <span
                  style={{
                    color: "#565959",
                    fontSize: 14,
                    fontWeight: 500,
                    letterSpacing: "0.4",
                  }}
                >
                  {individualData.description}
                </span>
              </p>
            </div>
          </div>
        )}
        {!individualData ? (
          <div className="circle">
            <CircularProgress />
            <h2>Loading...</h2>
          </div>
        ) : (
          ""
        )}
        <ToastContainer />
      </div>
    </>
  );
};

export default Cart;

import React, { useState,useContext } from "react";
import "./sign-in-up.css";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LoginContext } from "../context/ContextProvider";

const SignIn = () => {
  const history = useNavigate();
  const [logdata, setData] = useState({
    email: "",
    password: "",
  });
  //   console.log(logdata);
  // eslint-disable-next-line no-unused-vars
  const { account, setAccount } = useContext(LoginContext);
  
  
  const adddata = (e) => {
    const { name, value } = e.target;

    setData(() => {
      return {
        ...logdata,
        [name]: value,
      };
    });
  };

  const sendData = async (e) => {
    e.preventDefault();

    const {email, password} = logdata;
    const res = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email, password
      }),
    });

    const data = await res.json();
    console.log(data);

    if(res.status === 400 || !data){
      toast.warn("Invalid Details ", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }else{
      setAccount(data)
      toast.success("Login Successful", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setData({...logdata,email:"",password:""});
      history("/")
    }


  };

  return (
    <>
      <section>
        <div className="sign_container">
          <div className="sign_header">
            <img src="./blacklogoamazon.png" alt="" />
          </div>
          <div className="sign_form">
            <form method="POST">
              <h1>Sign-In</h1>
              <div className="form_data">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  name="email"
                  onChange={adddata}
                  value={logdata.email}
                  id="email"
                />
              </div>
              <div className="form_data">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  value={logdata.password}
                  name="password"
                  onChange={adddata}
                  placeholder=" At least 6 Char"
                  id="password"
                />
              </div>
              <button className="signin_btn" onClick={sendData}>
                Continue
              </button>
            </form>
          </div>
          <div className="create_accountinfo">
            <p>New To Amazon</p>
            <NavLink to="/register">
              <button>Create Your Amazon Account</button>
            </NavLink>
          </div>
        </div>
        <ToastContainer/>
      </section>
    </>
  );
};

export default SignIn;

import React, { useState } from "react";
import "./sign-in-up.css";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUP = () => {
  const history = useNavigate();

  const [udata, setUdata] = useState({
    fname: "",
    email: "",
    mobile: "",
    password: "",
    cpassword: "",
  });
  //   console.log(udata)
  const adddata = (e) => {
    const { name, value } = e.target;

    setUdata(() => {
      return {
        ...udata,
        [name]: value,
      };
    });
  };

  const sendData = async (e) => {
    e.preventDefault();

    const { fname, email, mobile, password, cpassword } = udata;
    if (
      fname === "" ||
      email === "" ||
      mobile === "" ||
      password === "" ||
      cpassword === ""
    ) {
      toast.warn("Please Provide All the Data ", {
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
      const res = await fetch("register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fname,
          email,
          mobile,
          password,
          cpassword,
        }),
      });

      const data = await res.json();
      // console.log(data);

      if (res.status === 422 || !data) {
        // alert("Registration failed");
        toast.warn("Registration failed", {
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
        // alert("Registered Successfully ");
        toast.success("Registered Successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        history("/login")
      }
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
              <h1>Sign-Up</h1>
              <div className="form_data">
                <label htmlFor="fname">Your Name</label>
                <input
                  type="text"
                  name="fname"
                  onChange={adddata}
                  value={udata.fname}
                  id="fname"
                />
              </div>
              <div className="form_data">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  name="email"
                  onChange={adddata}
                  value={udata.email}
                  id="email"
                />
              </div>
              <div className="form_data">
                <label htmlFor="mobile">Mobile</label>
                <input
                  type="number"
                  name="mobile"
                  onChange={adddata}
                  value={udata.mobile}
                  id="mobile"
                />
              </div>
              <div className="form_data">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  onChange={adddata}
                  value={udata.password}
                  id="password"
                />
              </div>
              <div className="form_data">
                <label htmlFor="cpassword">Confirm Password</label>
                <input
                  type="password"
                  name="cpassword"
                  onChange={adddata}
                  value={udata.cpassword}
                  id="cpassword"
                />
              </div>
              <button className="signin_btn" onClick={sendData}>
                Continue
              </button>
              <div className="signin_info">
                <p>Already Have an account?</p>
                <NavLink to="/login">Sign In</NavLink>
              </div>
            </form>
          </div>
          <ToastContainer />
        </div>
      </section>
    </>
  );
};

export default SignUP;

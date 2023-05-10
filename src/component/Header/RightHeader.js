import React, { useContext } from "react";
import "./rightHeader.css";
import Avatar from "@mui/material/Avatar";
import { LoginContext } from "../context/ContextProvider";
import { NavLink } from "react-router-dom";
import { Divider } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

const RightHeader = ({ LogClose, logOutUser }) => {
  // eslint-disable-next-line no-unused-vars
  const { account, setAccount } = useContext(LoginContext);
  return (
    <>
      <div className="rightheader">
        <div className="right_nav">
          {account ? (
            <Avatar className="avatar2">
              {account.fname[0].toUpperCase()}
            </Avatar>
          ) : (
            <Avatar className="avatar"></Avatar>
          )}
          {account ? <h3>Hello, {account.fname.toUpperCase()}</h3> : ""}
        </div>
        <div className="nav_btn" onClick={() => LogClose()}>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/">Shop By Category</NavLink>

          <Divider style={{ width: "100%", marginLeft: "-20px" }} />

          <NavLink to="/">Today's Deal</NavLink>
          {account ? (
            <NavLink to="/buynow">Your Orders</NavLink>
          ) : (
            <NavLink to="/login">Your Orders</NavLink>
          )}

          <Divider style={{ width: "100%", marginLeft: "-20px" }} />

          <div className="flag">
            <NavLink to="/">Settings</NavLink>
            <img src="./india.png" style={{width:35,marginLeft:10}} alt="" />
          </div>
          {account ? (
            <div className="flag">
              <LogoutIcon
                style={{ fontSize: 18, marginRight: 4 }}
                onClick={() => logOutUser()}
              />
              <h3
                style={{ cursor: "pointer", fontWeight: 500 }}
                onClick={() => logOutUser()}
              >
                Logout
              </h3>
            </div>
          ) : (
            <NavLink to="/login">SignIN</NavLink>
          )}
        </div>
      </div>
    </>
  );
};

export default RightHeader;

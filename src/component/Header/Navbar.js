import React, { useContext, useEffect, useState } from "react";
import "./navbar.css";
import SearchIcon from "@mui/icons-material/Search";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import { NavLink, useNavigate } from "react-router-dom";
import { LoginContext } from "../context/ContextProvider";
import RightHeader from "./RightHeader";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import LogoutIcon from "@mui/icons-material/Logout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { account, setAccount } = useContext(LoginContext);
  // console.log(account);

  const history = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [text, setText] = useState("");
  console.log(text);
  const [liopen, setLiopen] = useState(true);
  const { products } = useSelector((state) => state.getProductsdata);

  const [dropen, setDropen] = useState(false);

  const getDetailsValidUser = async () => {
    const res = await fetch("/validuser", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "content-type": "application/json",
      },
      credentials: "include",
    });

    const data = await res.json();
    // console.log(data);

    if (res.status !== 201) {
      console.log("error");
    } else {
      console.log("data valid");
      setAccount(data);
    }
  };
  const handleopen = () => {
    setDropen(true);
  };

  const handledrclose = () => {
    setDropen(false);
  };

  const logOutUser = async () => {
    const res2 = await fetch("/logout", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "content-type": "application/json",
      },
      credentials: "include",
    });

    // const data2 = await res2.json();
    // console.log(data);

    if (res2.status !== 201) {
      console.log("error");
    } else {
      // console.log("data valid");
      // alert("logout successful");
      toast.success("User Logout Successfully ", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setAccount(false);
      history("/");
    }
  };

  const logfunctions = () => {
    handleClose();
    logOutUser();
  };

  const getText = (items) => {
    setText(items);
    setLiopen(false);
  };
  useEffect(() => {
    getDetailsValidUser();
  });

  return (
    <>
      <header>
        <nav>
          <div className="left">
            <IconButton className="hamburgur" onClick={handleopen}>
              <MenuIcon style={{ color: "#fff" }} />
            </IconButton>
            <Drawer open={dropen}>
              <RightHeader LogClose={handledrclose} logOutUser={logOutUser} />
            </Drawer>
            <div className="navlogo">
              <NavLink to="/">
                <img src="./amazon_PNG25.png" alt="" />
              </NavLink>
            </div>
            <div className="nav_searchbaar">
              <input
                type="text"
                name=""
                id=""
                placeholder="Search Amazon.in"
                onChange={(e) => getText(e.target.value)}
              />
              <div className="search_icon">
                <SearchIcon id="search" />
              </div>

              {/* Search filter */}
              {text && (
                <List className="extrasearch" hidden={liopen}>
                  {products
                    .filter((product) =>
                      product.title.longTitle
                        .toLowerCase()
                        .includes(text.toLowerCase())
                    )
                    .map((product) => (
                      <ListItem>
                        <NavLink
                          to={`/getproductsone/${product.id}`}
                          onClick={() => setLiopen(true)}
                        >
                          {product.title.longTitle}
                        </NavLink>
                      </ListItem>
                    ))}
                </List>
              )}
            </div>
          </div>
          <div className="right">
            <div className="nav_btn">
              {!account ? <NavLink to="/login">Sign In</NavLink> : ""}
            </div>
            <div className="cart_btn">
              {account ? (
                <NavLink to="/buynow">
                  <Badge badgeContent={account.carts.length} color="primary">
                    <ShoppingCartIcon id="icon" />
                  </Badge>
                </NavLink>
              ) : (
                <NavLink to="/login">
                  <Badge badgeContent={0} color="primary">
                    <ShoppingCartIcon id="icon" />
                  </Badge>
                </NavLink>
              )}
              <p>Cart</p>
            </div>
            {account ? (
              <Avatar
                className="avatar2"
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                {account.fname[0].toUpperCase()}
              </Avatar>
            ) : (
              <Avatar
                className="avatar"
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              ></Avatar>
            )}

            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleClose}>My account</MenuItem>
              {account ? (
                <MenuItem onClick={logfunctions}>
                  <LogoutIcon style={{ fontSize: 16, marginRight: 3 }} /> Logout
                </MenuItem>
              ) : (
                ""
              )}
            </Menu>
          </div>
        </nav>
      </header>
      <ToastContainer />
    </>
  );
};

export default Navbar;

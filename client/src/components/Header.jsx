import React from "react";
import logo from "../assets/robott.png";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleSignOut = () => {};
  return (
    <header>
      <NavLink to="/" className="logo">
        <img src={logo} alt="logo" />
        <h1 style={{textTransform:"uppercase",fontSize:"32px"}}>AI-ChatBot</h1>
      </NavLink>
      {currentUser ? (
        <div className="profile-section">
          <span onClick={handleSignOut}>Logout</span>
        </div>
      ) : (
        <NavLink to="/login" style={{ fontSize: "24px", color: "#fff" }}>
          Login
        </NavLink>
      )}
    </header>
  );
};

export default Header;

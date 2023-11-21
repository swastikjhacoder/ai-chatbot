import React from "react";
import logo from "../assets/robott.png";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  signOutUserStart,
  signOutUserFailure,
  signOutUserSuccess,
} from "../redux/userSlice";
import axios from "axios";

const Header = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await axios.post("/user/logout");
      const data = await res.data;
      if (data.success === false) {
        dispatch(signOutUserFailure(data.message));
        return;
      }
      localStorage.clear();
      dispatch(signOutUserSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signOutUserFailure(error.message));
    }
  };
  return (
    <header>
      <NavLink to="/" className="logo">
        <img src={logo} alt="logo" />
        <h1 style={{ textTransform: "uppercase" }}>AI-ChatBot</h1>
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

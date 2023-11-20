import React, { useEffect, useState } from "react";
import { FiLogIn } from "react-icons/fi";
import { NavLink, useNavigate } from "react-router-dom";
import PasswordInput from "../components/PasswordInput";
import { useDispatch, useSelector } from "react-redux";
import { signInStart, signInSuccess, signInFailure } from "../redux/userSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, loading } = useSelector((state) => state.user);
  const [emailError, setEmailError] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch("/user/login", {
        method: "POST",
        body: JSON.stringify(formData),
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      } else {
        dispatch(signInSuccess(data));
        localStorage.setItem("current_user", data._id);
        e.target.reset();
        navigate("/");
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  useEffect(() => {
    if (formData.email.length > 0) {
      if (
        formData.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
      ) {
        setEmailError(false);
      } else {
        setEmailError(true);
      }
    } else {
      setEmailError(false);
    }
  }, [formData.email]);

  return (
    <div className="login-container">
      <div className="card" style={{ marginTop: "50px" }}>
        <h1
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "10px",
          }}
        >
          <FiLogIn />
          Login
        </h1>
        <form method="POST" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            autoComplete="on"
            value={formData.email}
            onChange={handleChange}
          />
          {emailError && (
            <p style={{ color: "#ff0000" }}>Please enter a valid email!</p>
          )}
          <PasswordInput
            name="password"
            id="password"
            placeholder="Password"
            autoComplete="on"
            value={formData.confirm}
            onChange={handleChange}
          />
          <button type="submit" className="login-btn">
            {loading ? "Loading..." : "Login"}
          </button>
          {error && (
            <p style={{ color: "#ff0000", textAlign: "center" }}>
              Invalid login credentials!
            </p>
          )}
        </form>
        <div className="navigation">
          <NavLink style={{ textAlign: "center" }} to="/">
            {`< Home >`}
          </NavLink>
          <p>
            Dont have an account?{" "}
            <NavLink to="/register">{`- Register`}</NavLink>
          </p>
        </div>
        {error && <p style={{ color: "#ff0000" }}>{error}</p>}
      </div>
    </div>
  );
};

export default Login;

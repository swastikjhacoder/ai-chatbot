import React, { useEffect, useState } from "react";
import { FiLogIn } from "react-icons/fi";
import { NavLink, useNavigate } from "react-router-dom";
import PasswordInput from "../components/PasswordInput";
import { FaCheck, FaTimes } from "react-icons/fa";

const Register = () => {
  const navigate = useNavigate();
  const [upperCase, setUpperCase] = useState(false);
  const [lowerCase, setLowerCase] = useState(false);
  const [num, setNum] = useState(false);
  const [specialChar, setSpecialChar] = useState(false);
  const [length, setLength] = useState(false);
  const [nameError, setNameError] = useState(true);
  const [emailError, setEmailError] = useState(true);
  const [passwordError, setPasswordError] = useState(true);
  const [confirmPasswordError, setConfirmPasswordError] = useState(true);
  const [validData, setValidData] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (formData.name.length > 0) {
      if (formData.name.match(/^[a-zA-Z ]{2,30}$/)) {
        setNameError(false);
      } else {
        setNameError(true);
      }
    } else {
      setNameError(false);
    }
  }, [formData.name]);

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

  useEffect(() => {
    if (formData.password.length > 0) {
      if (formData.password.match(/([A-Z])/)) {
        setUpperCase(true);
      } else {
        setUpperCase(false);
      }

      if (formData.password.match(/([a-z])/)) {
        setLowerCase(true);
      } else {
        setLowerCase(false);
      }

      if (formData.password.match(/([0-9])/)) {
        setNum(true);
      } else {
        setNum(false);
      }

      if (formData.password.match(/([!,%,&,@,#,$,^,*,?,_,~])/)) {
        setSpecialChar(true);
      } else {
        setSpecialChar(false);
      }

      if (formData.password.length > 5) {
        setLength(true);
      } else {
        setLength(false);
      }
    } else {
      setPasswordError(false);
      setUpperCase(false);
      setLowerCase(false);
      setNum(false);
      setSpecialChar(false);
      setLength(false);
    }
  }, [formData.password]);

  useEffect(() => {
    if (formData.password.length > 0) {
      if (upperCase && lowerCase && num && specialChar && length) {
        setPasswordError(false);
        setValidData(true);
      } else {
        setPasswordError(true);
        setValidData(false);
      }
    } else {
      setPasswordError(false);
      setValidData(true);
    }
  }, [
    upperCase,
    lowerCase,
    num,
    specialChar,
    length,
    formData.password.length,
  ]);

  useEffect(() => {
    if (formData.confirm.length > 0) {
      if (formData.password.toString() === formData.confirm.toString()) {
        setConfirmPasswordError(false);
      } else {
        setConfirmPasswordError(true);
      }
    } else {
      setConfirmPasswordError(false);
    }
  }, [formData.confirm, formData.password]);

  return (
    <div className="register-container">
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
          Register
        </h1>
        <form method="POST">
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Full name"
            autoComplete="on"
            required
            value={formData.name}
            onChange={handleChange}
          />
          {nameError && (
            <p style={{ color: "#ff0000" }}>Please enter a valid name!</p>
          )}
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            autoComplete="on"
            required
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
            value={formData.password}
            onChange={handleChange}
          />
          {passwordError && (
            <p style={{ color: "#ff0000" }}>Please make a strong password!</p>
          )}
          <PasswordInput
            name="confirm"
            id="confirm"
            placeholder="Confirm Password"
            autoComplete="on"
            value={formData.confirm}
            onChange={handleChange}
          />
          {confirmPasswordError && (
            <p style={{ color: "#ff0000" }}>Password did not match!</p>
          )}
          <div className="strong-password-container">
            <ul>
              <li>
                <span style={{ fontWeight: 600 }}>
                  Password should contain -
                </span>
              </li>
              <li>
                <div style={{ display: "flex", alignItems: "center" }}>
                  {upperCase ? (
                    <FaCheck style={{ color: "#008000" }} />
                  ) : (
                    <FaTimes style={{ color: "#ff0000" }} />
                  )}
                </div>
                <div>An English uppercase character (A-Z)</div>
              </li>
              <li>
                <div style={{ display: "flex", alignItems: "center" }}>
                  {lowerCase ? (
                    <FaCheck style={{ color: "#008000" }} />
                  ) : (
                    <FaTimes style={{ color: "#ff0000" }} />
                  )}
                </div>
                <div>An English lowercase character (a-z)</div>
              </li>
              <li>
                <div style={{ display: "flex", alignItems: "center" }}>
                  {num ? (
                    <FaCheck style={{ color: "#008000" }} />
                  ) : (
                    <FaTimes style={{ color: "#ff0000" }} />
                  )}
                </div>
                <div>A number (0-9)</div>
              </li>
              <li>
                <div style={{ display: "flex", alignItems: "center" }}>
                  {specialChar ? (
                    <FaCheck style={{ color: "#008000" }} />
                  ) : (
                    <FaTimes style={{ color: "#ff0000" }} />
                  )}
                </div>
                <div>A symbol (such as !, #, or %)</div>
              </li>
              <li>
                <div style={{ display: "flex", alignItems: "center" }}>
                  {length ? (
                    <FaCheck style={{ color: "#008000" }} />
                  ) : (
                    <FaTimes style={{ color: "#ff0000" }} />
                  )}
                </div>
                <div>Six or more characters total.</div>
              </li>
            </ul>
          </div>
          <button type="submit" className="login-btn">
            {loading ? "Registering...." : "Register"}
          </button>
          {!validData && (
            <p style={{ color: "#ff0000", textAlign: "center" }}>
              Please check the input before submitting!
            </p>
          )}
        </form>
        <div className="navigation">
          <NavLink style={{ textAlign: "center" }} to="/">
            {`< Home >`}
          </NavLink>
          <p>
            Already have an account? <NavLink to="/login">- Login</NavLink>
          </p>
        </div>
        {error && (
          <p style={{ color: "#ff0000", marginTop: "10px" }}>{error}</p>
        )}
      </div>
    </div>
  );
};

export default Register;

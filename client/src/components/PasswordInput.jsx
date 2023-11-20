import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const PasswordInput = ({
  name,
  id,
  placeholder,
  autoComplete,
  value,
  onChange,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const toggleShow = () => setShowPassword(!showPassword);
  return (
    <div className="password-box">
      <input
        type={showPassword ? "text" : "password"}
        name={name}
        id={id}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required
        value={value}
        onChange={onChange}
      />
      <div className="eye-icon" onClick={toggleShow}>
        {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
      </div>
    </div>
  );
};

export default PasswordInput;

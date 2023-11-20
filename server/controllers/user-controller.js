import User from "../models/user-model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "dotenv";

config();

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || name.trim() == "") {
      return res.status(402).json({ message: "Name is required!" });
    }
    if (!email || email.trim() == "") {
      return res.status(402).json({ message: "Email is required!" });
    }
    if (!password || password.trim() == "") {
      return res.status(402).json({ message: "Password is required!" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(401).json({ message: "User is already registered!" });
    }
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    return res
      .status(200)
      .json({ message: "User registered successfully! 👍🏻" });
  } catch (error) {
    next(error);
    return res.status(500).json({ error: error.message });
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const validUser = await User.findOne({ email });
    if (!validUser) return res.status(404).json({ message: "User not found!" });
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword)
      return res.status(401).json({ message: "Wrong credentials!" });
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    res
      .cookie("auth_token", token, { httpOnly: true })
      .status(200)
      .json(validUser);
  } catch (error) {
    next(error);
    return res.status(500).json({ message: error.message });
  }
};

export const logout = (req, res, next) => {
  try {
    res.clearCookie("auth_token");
    res.status(200).json({ message: "User has been logged out!" });
  } catch (error) {
    next(error);
  }
};

import User from "../models/user-model.js";
import { hashSync, compareSync } from "bcrypt";

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
    const hashedPassword = hashSync(password, 10);
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

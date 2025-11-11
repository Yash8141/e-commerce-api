import { User } from "../models/User.js";
import bcrypt from "bcryptjs";

// User Register
export const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        message: "Request body required",
        success: false,
      });
    }
    // Validate user fields
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Please fill all the fields", success: false });
    }

    // Validate password length
    if (password.length < 8) {
      return res.status(400).json({
        message: "Password must be at least 8 character",
        success: false,
      });
    }

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        message: "User with this email already exists",
        success: false,
      });
    }

    // decrypt password
    const hashPassword = await bcrypt.hash(password, 10);

    // Create new user
    const registerNewUser = new User({ name, email, password: hashPassword });
    await registerNewUser.save();

    if (registerNewUser) {
      return res.status(201).json({
        message: "User registered successfully",
        data: registerNewUser,
        success: true,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
};

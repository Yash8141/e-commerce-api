import { User } from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// User Login
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        message: "Request body required",
        success: false,
      });
    }

    if (!email || !password) {
      return res.status(400).json({
        message: "Please fill all the fields",
        success: false,
      });
    }

    const findEmail = await User.findOne({ email });

    if (!findEmail) {
      return res.status(404).json({
        message: "Email not exists",
        success: false,
      });
    }

    const validPassword = await bcrypt.compare(password, findEmail.password);
    if (!validPassword) {
      return res.status(400).json({
        message: "Invalid password",
        success: false,
      });
    }

    const token = jwt.sign({ user_id: findEmail._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    if (findEmail && validPassword) {
      res.status(200).json({
        message: "Login successfully",
        success: true,
        data: findEmail,
        token: token,
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

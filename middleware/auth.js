import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

const authenticationToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.startsWith("Bearer ") 
    ? authHeader.slice(7) 
    : authHeader;

  if (!token) {
    return res.status(401).json({
      message: "Access token required",
      success: false,
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("decoded", decoded);
    const user = await User.findById(decoded.user_id);
    if (!user) {
      return res.status(401).json({
        message: "Invalid token",
        success: false,
      });
    }   
    req.user = user;
    next();
  } catch (error) {
    return res.status(403).json({
      message: "Invalid or expired token",
      success: false,
    });
  }
};

export default authenticationToken;

import express from "express";
import { register, toggleUserStatus, getMyUsers, getAllUsers } from "../controllers/user.js";
import { login } from "../controllers/login.js";
import authenticationToken from "../middleware/auth.js";
const router = express.Router();

// Create New User (Public or Admin-led)
router.post("/register", (req, res, next) => {
  // Try to authenticate, but don't fail if no token provided (public registration)
  const authHeader = req.headers["authorization"];
  if (authHeader) {
    return authenticationToken(req, res, next);
  }
  next();
}, register);

// login
router.post("/login", login);

// Admin actions
router.patch("/status/:id", authenticationToken, toggleUserStatus);

// Get user by admin
router.get("/my-users", authenticationToken, getMyUsers);

// Get all users
router.get("/all", authenticationToken, getAllUsers);
export default router;
import express from "express";
import { register } from "../controllers/user.js";

const router = express.Router();

// Create New User
router.post("/register", register);

export default router;

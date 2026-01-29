import express from "express";
import { addToCart, clearCart, decreaseProductQty, removeProductFromCart, userCart } from "../controllers/cart.js";
import authenticationToken from "../middleware/auth.js";
const router = express.Router();

// add to cart
router.post("/add", authenticationToken, addToCart);

// user cart
router.get("/user", authenticationToken, userCart);

// remove product from cart
router.delete("/remove/:productId", authenticationToken, removeProductFromCart);

// clear cart
router.delete("/clear", authenticationToken, clearCart);

// decreased qty
router.post("/update-qty", authenticationToken, decreaseProductQty);
export default router;
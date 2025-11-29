import express from "express";
import {
  addProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} from "../controllers/product.js";
import AuthToken from "../middleware/auth.js";

const router = express.Router();

// Add product
router.post("/add", AuthToken, addProduct);

// Get all products
router.get("/all", AuthToken, getAllProducts);

// Get product by id
router.get("/:id", AuthToken, getProductById);

// Update product by id
router.put("/:id",AuthToken, updateProduct)

// Delete product by id
router.delete("/:id",AuthToken,deleteProduct)
export default router;

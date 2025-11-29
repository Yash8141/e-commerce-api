import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {},
  { strict: false, timestamps: true }
);

export const Product = mongoose.model("product", productSchema);

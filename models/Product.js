import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({}, { strict: false, timestamps: true });

export const Product = mongoose.model("product", productSchema);

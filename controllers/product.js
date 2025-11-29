import { Product } from "../models/Product.js";
import mongoose from "mongoose";
import { buildSearchQuery, buildSortQuery } from "../utils/queryBuilder.js";
import { calculatePagination } from "../utils/calculatePagination.js";
import { validateProductQuery } from "../utils/validation.js";

// Add Product
export const addProduct = async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        message: "Request body is empty",
        success: false,
      });
    }
    const product = await Product.create(req.body);

    if (product) {
      return res.status(201).json({
        message: "Product added successfully",
        success: true,
        data: product,
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

// Get All Products
export const getAllProducts = async (req, res) => {
  try {
    const validateParams = validateProductQuery(req.query);
    const { page, limit, search, searchBy, sortDir, sortBy } =
      validateParams;
    console.log('search',search)
    // Build query object
    let query = {};

    // Add search filter
    if (search) {
      const searchQuery = buildSearchQuery(search, searchBy);
      query = { ...query, ...searchQuery };
    }

    // Build sort object
    const sortQuery = buildSortQuery(sortDir, sortBy);

    // Get total count for pagination;
    const total = await Product.countDocuments(query);

    // Calculate pagination
    const pagination = calculatePagination(total, page, limit);

    // const validateParams = validateProductQuery()
    const products = await Product.find(query)
    .sort(sortQuery)
    .skip(pagination.skip)
    .limit(pagination.limit)
    .lean()

    if (!products) {
      return res.status(404).json({
        message: "No products found",
        success: false,
      });
    }

    if (products) {
      return res.status(200).json({
        message: "Products fetched successfully",
        success: true,
        data: products,
        pagination: {
          page: pagination.page,
          limit: pagination.limit,
          total: pagination.total,
          totalPages: pagination.totalPages
          
        }
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

// Get Product By Id
export const getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid product ID format",
        success: false,
      });
    }
    console.log("id", id);
    const product = await Product.findById({ _id: id });

    if (!product) {
      return res.status(404).json({
        message: "No product found",
        success: false,
      });
    }

    if (product) {
      return res.status(200).json({
        message: "Product retrieved successfully",
        success: true,
        data: product,
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

// Update Product
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid Product ID format",
        success: false,
      });
    }

    if (!req.body) {
      return res.status(400).json({
        message: "Request body is empty",
        success: false,
      });
    }

    const product = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
        success: false,
      });
    }
    if (product) {
      return res.status(200).json({
        message: "Product updated successfully",
        success: true,
        data: product,
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

// Delete product
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid Product ID format",
        success: false,
      });
    }

    const product = await Product.findOneAndDelete({
      title: "Nintendo Switch 2",
    });

    if (!product) {
      return res.status(400).json({
        message: "Product not found",
        success: false,
      });
    }

    if (product) {
      return res.status(200).json({
        message: "Product deleted successfully",
        success: true,
        data: product,
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

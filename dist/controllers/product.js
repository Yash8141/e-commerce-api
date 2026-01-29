"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateProduct = exports.getProductById = exports.getAllProducts = exports.deleteProduct = exports.addProduct = void 0;
var _Product = require("../models/Product.js");
var _mongoose = _interopRequireDefault(require("mongoose"));
var _queryBuilder = require("../utils/queryBuilder.js");
var _calculatePagination = require("../utils/calculatePagination.js");
var _validation = require("../utils/validation.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// Add Product
const addProduct = async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        message: "Request body is empty",
        success: false
      });
    }
    const product = await _Product.Product.create(req.body);
    if (product) {
      return res.status(201).json({
        message: "Product added successfully",
        success: true,
        data: product
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message
    });
  }
};

// Get All Products
exports.addProduct = addProduct;
const getAllProducts = async (req, res) => {
  try {
    const validateParams = (0, _validation.validateProductQuery)(req.query);
    const {
      page,
      limit,
      search,
      searchBy,
      sortDir,
      sortBy
    } = validateParams;
    // Build query object
    let query = {};

    // Add search filter
    if (search) {
      const searchQuery = (0, _queryBuilder.buildSearchQuery)(search, searchBy);
      query = {
        ...query,
        ...searchQuery
      };
    }

    // Build sort object
    const sortQuery = (0, _queryBuilder.buildSortQuery)(sortDir, sortBy);

    // Get total count for pagination;
    const total = await _Product.Product.countDocuments(query);

    // Calculate pagination
    const pagination = (0, _calculatePagination.calculatePagination)(total, page, limit);

    // const validateParams = validateProductQuery()
    const products = await _Product.Product.find(query).sort(sortQuery).skip(pagination.skip).limit(pagination.limit).lean();
    if (!products) {
      return res.status(404).json({
        message: "No products found",
        success: false
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
      error: error.message
    });
  }
};

// Get Product By Id
exports.getAllProducts = getAllProducts;
const getProductById = async (req, res) => {
  const {
    id
  } = req.params;
  try {
    if (!_mongoose.default.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid product ID format",
        success: false
      });
    }
    const product = await _Product.Product.findById({
      _id: id
    });
    if (!product) {
      return res.status(404).json({
        message: "No product found",
        success: false
      });
    }
    if (product) {
      return res.status(200).json({
        message: "Product retrieved successfully",
        success: true,
        data: product
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message
    });
  }
};

// Update Product
exports.getProductById = getProductById;
const updateProduct = async (req, res) => {
  try {
    const {
      id
    } = req.params;
    if (!_mongoose.default.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid Product ID format",
        success: false
      });
    }
    if (!req.body) {
      return res.status(400).json({
        message: "Request body is empty",
        success: false
      });
    }
    const product = await _Product.Product.findByIdAndUpdate(id, req.body, {
      new: true
    });
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
        success: false
      });
    }
    if (product) {
      return res.status(200).json({
        message: "Product updated successfully",
        success: true,
        data: product
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message
    });
  }
};

// Delete product
exports.updateProduct = updateProduct;
const deleteProduct = async (req, res) => {
  try {
    const {
      id
    } = req.params;
    if (!_mongoose.default.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid Product ID format",
        success: false
      });
    }
    const product = await _Product.Product.findByIdAndDelete({
      _id: id
    });
    if (!product) {
      return res.status(400).json({
        message: "Product not found",
        success: false
      });
    }
    if (product) {
      return res.status(200).json({
        message: "Product deleted successfully",
        success: true,
        data: product
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message
    });
  }
};
exports.deleteProduct = deleteProduct;
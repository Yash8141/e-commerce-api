"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toggleUserStatus = exports.register = exports.getMyUsers = exports.getAllUsers = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var _User = require("../models/User.js");
var _bcryptjs = _interopRequireDefault(require("bcryptjs"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// User Register
const register = async (req, res) => {
  const {
    name,
    email,
    password,
    role,
    isActive
  } = req.body;
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        message: "Request body required",
        success: false
      });
    }
    // Validate user fields
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Please fill all the fields",
        success: false
      });
    }

    // Validate password length
    if (password.length < 8) {
      return res.status(400).json({
        message: "Password must be at least 8 character",
        success: false
      });
    }

    // Check if user already exists
    const userExists = await _User.User.findOne({
      email
    });
    if (userExists) {
      return res.status(400).json({
        message: "User with this email already exists",
        success: false
      });
    }

    // Check if this is the first user
    const userCount = await _User.User.countDocuments();
    let userRole = "user";
    let userActive = false;
    let createdBy = null;
    if (userCount === 0) {
      // First user becomes super admin
      userRole = "admin";
      userActive = true;
      createdBy = null; // Super admin has no creator
    } else if (req.user && req.user.role === "admin") {
      // Admin creating a user
      userRole = role || "user";
      userActive = isActive !== undefined ? isActive : false;
      createdBy = req.user._id;
    } else {
      // Public registration
      userRole = "user";
      userActive = false;
      createdBy = null;
    }

    // Hash password
    const hashPassword = await _bcryptjs.default.hash(password, 10);

    // Create new user
    const registerNewUser = new _User.User({
      name,
      email,
      password: hashPassword,
      role: userRole,
      isActive: userActive,
      createdBy
    });
    await registerNewUser.save();

    // Populate createdBy if it exists
    await registerNewUser.populate("createdBy", "name email role");
    return res.status(201).json({
      message: "User registered successfully",
      data: registerNewUser,
      success: true
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message
    });
  }
};

// Toggle User Active Status (Admin Only)
exports.register = register;
const toggleUserStatus = async (req, res) => {
  const {
    id
  } = req.params;
  const {
    isActive
  } = req.body;
  try {
    if (!_mongoose.default.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Not valid ID format",
        success: false
      });
    }
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        message: "Request body required",
        success: false
      });
    }
    if (req.user.role !== "admin") {
      return res.status(403).json({
        message: "Only admins can perform this action",
        success: false
      });
    }
    const user = await _User.User.findById(id);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false
      });
    }
    user.isActive = isActive !== undefined ? isActive : !user.isActive;
    await user.save();

    // Populate createdBy before sending response
    await user.populate("createdBy", "name email");
    return res.status(200).json({
      message: `User ${user.isActive ? "activated" : "deactivated"} successfully`,
      success: true,
      data: user
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message
    });
  }
};

// Get users created by the logged-in admin
exports.toggleUserStatus = toggleUserStatus;
const getMyUsers = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({
        message: "Only admins can view their created users",
        success: false
      });
    }

    // Find users created by this admin
    const users = await _User.User.find({
      createdBy: req.user._id,
      role: "user"
    }).sort({
      createdAt: -1
    }).populate("createdBy", "name email role").select("-password");
    return res.status(200).json({
      message: "Users fetched successfully",
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message
    });
  }
};

// Get all users
exports.getMyUsers = getMyUsers;
const getAllUsers = async (req, res) => {
  try {
    const users = await _User.User.find().sort({
      createdAt: -1
    }).populate("createdBy", "name email role").select("-password");
    if (users && users.length > 0) {
      return res.status(200).json({
        message: "Users retrieved successfully.",
        success: true,
        count: users.length,
        data: users
      });
    } else {
      return res.status(404).json({
        message: "No users found",
        success: false
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
exports.getAllUsers = getAllUsers;
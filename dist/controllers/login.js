"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.login = void 0;
var _User = require("../models/User.js");
var _bcryptjs = _interopRequireDefault(require("bcryptjs"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// User Login
const login = async (req, res) => {
  const {
    email,
    password
  } = req.body;
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        message: "Request body required",
        success: false
      });
    }
    if (!email || !password) {
      return res.status(400).json({
        message: "Please fill all the fields",
        success: false
      });
    }
    const findEmail = await _User.User.findOne({
      email
    });
    if (!findEmail) {
      return res.status(404).json({
        message: "Email not exists",
        success: false
      });
    }
    const validPassword = await _bcryptjs.default.compare(password, findEmail.password);
    if (!validPassword) {
      return res.status(400).json({
        message: "Invalid password",
        success: false
      });
    }
    const token = _jsonwebtoken.default.sign({
      user_id: findEmail._id
    }, process.env.JWT_SECRET, {
      expiresIn: "1d"
    });
    if (!findEmail.isActive) {
      return res.status(403).json({
        message: "contact admin for activation of user",
        success: false
      });
    }
    if (findEmail && validPassword) {
      await findEmail.populate("createdBy", "name email");
      res.status(200).json({
        message: "Login successfully",
        success: true,
        data: findEmail,
        token: token
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
exports.login = login;
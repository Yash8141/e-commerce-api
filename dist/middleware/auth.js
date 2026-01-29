"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _User = require("../models/User.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const authenticationToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.startsWith("Bearer ") ? authHeader.slice(7) : authHeader;
  if (!token) {
    return res.status(401).json({
      message: "Access token required",
      success: false
    });
  }
  try {
    const decoded = _jsonwebtoken.default.verify(token, process.env.JWT_SECRET);
    const user = await _User.User.findById(decoded.user_id);
    if (!user) {
      return res.status(401).json({
        message: "Invalid token",
        success: false
      });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(403).json({
      message: "Invalid or expired token",
      success: false
    });
  }
};
var _default = exports.default = authenticationToken;
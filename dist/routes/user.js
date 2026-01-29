"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _user = require("../controllers/user.js");
var _login = require("../controllers/login.js");
var _auth = _interopRequireDefault(require("../middleware/auth.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const router = _express.default.Router();

// Create New User (Public or Admin-led)
router.post("/register", (req, res, next) => {
  // Try to authenticate, but don't fail if no token provided (public registration)
  const authHeader = req.headers["authorization"];
  if (authHeader) {
    return (0, _auth.default)(req, res, next);
  }
  next();
}, _user.register);

// login
router.post("/login", _login.login);

// Admin actions
router.patch("/status/:id", _auth.default, _user.toggleUserStatus);

// Get user by admin
router.get("/my-users", _auth.default, _user.getMyUsers);

// Get all users
router.get("/all", _auth.default, _user.getAllUsers);
var _default = exports.default = router;
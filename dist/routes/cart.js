"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _cart = require("../controllers/cart.js");
var _auth = _interopRequireDefault(require("../middleware/auth.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const router = _express.default.Router();

// add to cart
router.post("/add", _auth.default, _cart.addToCart);

// user cart
router.get("/user", _auth.default, _cart.userCart);

// remove product from cart
router.delete("/remove/:productId", _auth.default, _cart.removeProductFromCart);

// clear cart
router.delete("/clear", _auth.default, _cart.clearCart);

// decreased qty
router.post("/update-qty", _auth.default, _cart.decreaseProductQty);
var _default = exports.default = router;
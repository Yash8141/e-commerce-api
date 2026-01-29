"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _product = require("../controllers/product.js");
var _auth = _interopRequireDefault(require("../middleware/auth.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const router = _express.default.Router();

// Add product
router.post("/add", _auth.default, _product.addProduct);

// Get all products
router.get("/all", _auth.default, _product.getAllProducts);

// Get product by id
router.get("/:id", _auth.default, _product.getProductById);

// Update product by id
router.put("/:id", _auth.default, _product.updateProduct);

// Delete product by id
router.delete("/:id", _auth.default, _product.deleteProduct);
var _default = exports.default = router;
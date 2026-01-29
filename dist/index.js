"use strict";

var _express = _interopRequireDefault(require("express"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _cors = _interopRequireDefault(require("cors"));
var _db = require("./config/db.js");
var _user = _interopRequireDefault(require("./routes/user.js"));
var _product = _interopRequireDefault(require("./routes/product.js"));
var _cart = _interopRequireDefault(require("./routes/cart.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
_dotenv.default.config({
  path: ".env"
});
const app = (0, _express.default)();
const port = process.env.PORT || 3000;
app.use(_express.default.json());
app.use((0, _cors.default)());
const mongoDbUrl = process.env.MONGODB_URL;
const dbName = process.env.DB_NAME;
await (0, _db.connectDb)(mongoDbUrl, dbName);

// Auth Router
app.use("/api/user", _user.default);

// Product Router
app.use("/api/product", _product.default);

// Cart Router
app.use("/api/cart", _cart.default);
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to E-Commerce Backend 🚀"
  });
});
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
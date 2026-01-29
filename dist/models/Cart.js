"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Cart = void 0;
var _mongoose = _interopRequireWildcard(require("mongoose"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const cartItemSchema = new _mongoose.Schema({
  productId: {
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: "Product",
    required: true
  },
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  qty: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});
const cartSchema = new _mongoose.Schema({
  userId: {
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  items: [cartItemSchema]
}, {
  timestamps: true
});
const Cart = exports.Cart = _mongoose.default.model("Cart", cartSchema);
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.User = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const userSchema = new _mongoose.default.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user"
  },
  isActive: {
    type: Boolean,
    default: false
  },
  createdBy: {
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: "User"
  }
}, {
  timestamps: true
});
const User = exports.User = _mongoose.default.model("User", userSchema);
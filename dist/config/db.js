"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connectDb = connectDb;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
async function connectDb(url, dbName) {
  try {
    await _mongoose.default.connect(url, {
      dbName: dbName
    });
    console.log("MongoDB Connected...");
  } catch (error) {
    console.log("MongoDB Connection Error", error);
    process.exit(1);
  }
}
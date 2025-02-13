const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorHandler");
const dotenv = require("dotenv");
dotenv.config();
exports.isAuthenticatedUser = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    // console.log("token");
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "login to access this resource",
      });
      next();
    }
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decodedData.id);
    if (!req.user) {
      return res.status(404).json({
        success: false,
        message: "user not found",
      });
      next();
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
    next();
  }
};

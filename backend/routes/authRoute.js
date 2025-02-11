const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const { generateToken } = require("../utils/generateToken");
require("../config/passport");
const router = express.Router();

//Google Auth Route
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

//Google callback route
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:5173/queryhub/login",
  }),
  (req, res) => {
    const token = generateToken(req.user);
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
    });
    res.redirect("http://localhost:5173/queryhub/profile");
  }
);
router.get("/allusers", async (req, res) => {
  const users = await User.find();
  res.send(users);
});
//Get User profile
router.get("/profile", async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: "Not verified",
      });
    }
    const user = await User.findOne({ _id: decoded.id });
    // console.log(user);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }
    res.status(200).json({
      user,
      success: true,
    });
  } catch (error) {
    res.status(401).json({
      message: "Invalid token",
      success: false,
    });
  }
});

//Logout Route
router.get("/logout", (req, res) => {
  res.clearCookie("token");
  req.logOut(() => {
    res.redirect("http://localhost:5173/queryhub");
  });
});

module.exports = router;

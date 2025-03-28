const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  getUserDetails,
  updatePassword,
  updateProfile,
  getAllUser,
  getSingleUser,
  deleteUser,
  getSingleUserDetails,
  generateOTP,
  verifyOTP,
} = require("../controllers/userController");
const { isAuthenticatedUser } = require("../middleware/authentication");
const router = express.Router();
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);
router.route("/password/reset").post(forgotPassword);
router.route("/password/reset/:token").post(resetPassword);
router.route("/me").get(isAuthenticatedUser, getSingleUser);
router.route("/password/update").put(isAuthenticatedUser, updatePassword);
router.route("/me/update").put(isAuthenticatedUser, updateProfile);
router.route("/:id").get(isAuthenticatedUser, getSingleUserDetails);
router.route("/get/users").get(getAllUser);
router.route(`/generate-otp`).post(isAuthenticatedUser, generateOTP);
router.route(`/verify-otp`).post(isAuthenticatedUser,verifyOTP);
module.exports = router;

const crypto = require("crypto");
const User = require("../models/userModel");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const generateToken = require("../utils/generateToken");
const { sendToken } = require("../utils/generateToken");
const cloudinary = require("cloudinary");
const ErrorHandler = require("../utils/errorHandler");
const sendEmail = require("../utils/sendEmail");
//Register a User
//need to add cloudinary
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  // const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
  //   folder: "avatars",
  //   width: 150,
  //   crop: "scale",
  // });
  const { name, email, password } = req.body;
  const findUser = await User.findOne({ email: email });
  // console.log(findUser);
  if (findUser) {
    return next(new ErrorHandler("user exists", 401));
  }
  const user = await User.create({
    name,
    email,
    password,
  });
  sendEmail({
    email: email,
    subject: "Welcome to QueryHub - Let's Build, Learn & Grow Together!",
    message: `Hi ${name},

              Welcome to QueryHub! 🚀 We're thrilled to have you on board.

              What is QueryHub?
              QueryHub is a dynamic platform designed to help developers, students, and tech enthusiasts ask questions, share knowledge, and collaborate on coding, development, and problem-solving. Whether you're debugging an issue, exploring new technologies, or contributing insights, this is the place for you!

              🔹 Ask & Answer - Post your questions and help others by sharing your expertise.
              🔹 Learn & Grow - Explore a vast knowledge base of coding problems, tutorials, and discussions.
              🔹 Connect & Collaborate - Engage with a community of like-minded tech enthusiasts.

              We're excited to see how you contribute and grow with us! Start by asking your first question or exploring the latest discussions.

              🚀 Join the conversation now: [Insert Link]

              If you ever need help, feel free to reach out!

              Happy Learning,
              The QueryHub Team`,
  });
  const token = user.getJWTToken();
  res.status(201).json({
    success: true,
    user,
    token,
  });
});

//Login User
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler("Please enter email and password", 400));
  }
  const user = await User.findOne({ email }).select("password");
  if (!user) {
    return next(new ErrorHandler("No user found", 401));
  }
  const isPasswordMatch = await user.comparePassword(password);
  if (!isPasswordMatch) {
    return next(new ErrorHandler("Invalid credentials", 401));
  }
  sendToken(user, 200, res);
});

//Logout User
exports.logoutUser = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
    secure: false,
  });
  res.status(200).json({
    success: true,
    message: "Logout Successfully",
  });
});

//forgot password
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({
    email: req.body.email,
  });
  if (!user) {
    return next(new ErrorHandler("User not found, kindly register", 404));
  }
  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });
  const resetPasswordUrl = `http://localhost:5173/queryhub/password/reset/${resetToken}`;
  const message = `Your password reset token is: -\n\n
  ${resetPasswordUrl}\n\n
  If you have not requested this email kindly ignore it`;
  try {
    await sendEmail({
      email: user.email,
      subject: "Queryhub Password Recovery",
      message,
    });
    res.status(200).json({
      success: true,
      message: `Email send to ${user.email} successfull. Kindly check your span folder`,
    });
  } catch (error) {
    console.log(error);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
    return next(new ErrorHandler(error.message, 500));
  }
});

//Reset Password
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });
  if (!user) {
    return next(
      new ErrorHandler(
        "Reset Password Token is invalid or has been expires",
        400
      )
    );
  }
  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password does not matched", 400));
  }
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  await user.save();
  sendToken(user, 200, res);
});

//get user details
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  res.status(200).json({
    success: true,
    user,
  });
});

//update user password
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user._id).select("+password");
  const isPasswordMatch = await user.comparePassword(req.body.oldPassword);
  if (!isPasswordMatch) {
    return next(new ErrorHandler("old password does not match", 401));
  }
  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHandler("password does not match", 400));
  }
  user.password = req.body.newPassword;
  await user.save();
  sendToken(user, 200, res);
});

//update user profile
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    about: req.body.about,
    tags: req.body.tags,
  };
  if (req.body.image) {
    const user = await User.findById(req.user.id);
    const myCloud = await cloudinary.v2.uploader.upload(req.body.image, {
      folder: "avatars",
      width: 150,
      crop: "scale",
    });
    newUserData.image = myCloud.secure_url;
  }
  const user = await User.findByIdAndUpdate(req.user.id, newUserData);
  res.status(200).json({
    success: true,
    user,
    message: "Profile updated",
  });
});

//get all users (admin)
exports.getAllUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.find();
  res.status(200).json({
    success: true,
    user,
  });
});

//Get single user
exports.getSingleUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new ErrorHandler("No user found", 400));
  }
  res.status(200).json({
    success: true,
    user,
  });
});

//Delete user -- Admin
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(
      new ErrorHandler(`user does not exists with Id: ${req.params.id}`, 400)
    );
  }
  await user.deleteOne();
  res.status(200).json({
    success: true,
  });
});

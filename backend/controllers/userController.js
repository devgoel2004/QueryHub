const crypto = require("crypto");
const User = require("../models/userModel");
const generateToken = require("../utils/generateToken");
const { sendToken } = require("../utils/generateToken");
const cloudinary = require("cloudinary");
const sendEmail = require("../utils/sendEmail");
//Register a User
//need to add cloudinary
exports.registerUser = async (req, res) => {
  try {
    // const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    //   folder: "avatars",
    //   width: 150,
    //   crop: "scale",
    // });
    const { name, email, password } = req.body;
    const findUser = await User.findOne({ email: email });
    // console.log(findUser);
    if (findUser) {
      return res.status(401).json({
        message: "user exists",
        success: false,
      });
    }
    if (!password || !name) {
      return res.status(404).json({
        message: "Enter password or name",
      });
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
      message: "User registered successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: "false",
      message: error,
    });
  }
};

//Login User
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email);
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Enter email or password",
      });
    }
    const user = await User.findOne({ email }).select("password");
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "no user found",
      });
    }
    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }
    sendToken(user, 200, res);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: "false",
      message: error,
    });
  }
};

//Logout User
exports.logoutUser = async (req, res, next) => {
  try {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
      secure: false,
    });
    res.status(200).json({
      success: true,
      message: "Logout Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: "false",
      message: error,
    });
  }
};

//forgot password
exports.forgotPassword = async (req, res, next) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "no user found",
      });
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
      return res.status(500).json({
        success: false,
        message: error,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: "false",
      message: error,
    });
  }
};

//Reset Password
exports.resetPassword = async (req, res, next) => {
  try {
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Reset password token is invalid or has been expires",
      });
    }
    if (req.body.password !== req.body.confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "password does not matched",
      });
    }
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    await user.save();
    sendToken(user, 200, res);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: "false",
      message: error,
    });
  }
};

//get user details
exports.getUserDetails = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: "false",
      message: error,
    });
  }
};

//update user password
exports.updatePassword = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select("+password");
    const isPasswordMatch = await user.comparePassword(req.body.oldPassword);
    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: "Old password does not matched",
      });
    }
    console.log(req.body.newPassword);
    if (req.body.newPassword !== req.body.confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "password does not matched",
      });
    }
    user.password = req.body.newPassword;
    await user.save();
    sendToken(user, 200, res);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: "false",
      message: error,
    });
  }
};

//update user profile
exports.updateProfile = async (req, res, next) => {
  try {
    console.log(req.user._id);
    const { name } = req.body;
    console.log(name);
    const newUserData = {
      name: req.body.name,
      email: req.body.email,
      about: req.body.about,
      tags: req.body.tags,
      phone: req.body.phone,
    };
    // console.log(phone);
    console.log(newUserData);
    // if (req.body.image) {
    //   const user = await User.findById(req.user.id);
    //   const myCloud = await cloudinary.v2.uploader.upload(req.body.image, {
    //     folder: "avatars",
    //     width: 150,
    //     crop: "scale",
    //   });
    //   newUserData.image = myCloud.secure_url;
    // }
    const user = await User.findByIdAndUpdate(req.user.id, newUserData);
    res.status(200).json({
      success: true,
      user,
      message: "Profile updated",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server error",
    });
  }
};

//get all users (admin)
exports.getAllUser = async (req, res, next) => {
  try {
    const user = await User.find();
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: "false",
      message: error,
    });
  }
};

//Get single user
exports.getSingleUser = async (req, res, next) => {
  try {
    console.log(req.user._id);
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(400).json({
        message: "no user found",
        success: false,
      });
    }
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: "false",
      message: "error",
      error,
    });
  }
};

//Delete user -- Admin
exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User does not exists",
      });
    }
    await user.deleteOne();
    res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: "false",
      message: error,
    });
  }
};

//GET SINGLE USER DETAILS
exports.getSingleUserDetails = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "no user found",
      });
    }
    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal error",
      error,
    });
  }
};

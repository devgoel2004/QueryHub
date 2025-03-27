const mongoose = require("mongoose");
const dotenv = require("dotenv");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
dotenv.config();
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: process.env.USER_ICON,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, "Please enter a valid email"],
  },
  otp: String,
  createdAt: {
    type: Date,
    expires: "5m",
    default: Date.now,
  },
  password: {
    type: String,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  phone: {
    type: Number,
    validate: [validator.isMobilePhone, "Please enter a valid mobile number"],
  },
  about: {
    type: String,
  },
  score1: {
    type: Number,
    default: 0,
  },
  score2: {
    type: Number,
    default: 0,
  },
  badge: {
    type: String,
    enum: [
      "Newbie",
      "Pupil",
      "Specialist",
      "Expert",
      "Candidate-Master",
      "Master",
      "Grand-Master",
    ],
    default: "Newbie",
  },
  answerGiven: {
    type: Number,
    default: 0,
  },
  joinedOn: {
    type: Date,
    default: Date.now,
  },
});
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

//JWT token
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

//Compare Password
userSchema.methods.comparePassword = async function (enterPassword) {
  return await bcrypt.compare(enterPassword, this.password);
};

//Reset Password token
userSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.resetPasswordToken = Date.now() + 15 * 60 * 1000;
  return resetToken;
};
module.exports = mongoose.model("User", userSchema);

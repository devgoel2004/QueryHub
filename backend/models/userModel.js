const mongoose = require("mongoose");
const dotenv = require("dotenv");
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
  },
  password: {
    type: String,
    // required: true,
  },
  about: {
    type: String,
  },
  tags: {
    type: [String],
    default: [],
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
      "Candidate Master",
      "Master",
      "Grand Master",
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
module.exports = mongoose.model("User", userSchema);

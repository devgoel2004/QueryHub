const mongoose = require("mongoose");
const QuestionSchema = mongoose.Schema({
  questionTitle: {
    type: String,
    required: true,
  },
  questionBody: {
    type: String,
    required: true,
  },
  questionTags: {
    type: [String],
    required: true,
  },
  noOfAnswers: {
    type: Number,
    default: 0,
  },
  upVote: {
    type: Number,
    default: 0,
  },
  downVote: {
    type: Number,
    default: 0,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  postedOn: {
    type: Date,
    default: Date.now,
  },
  answer: [
    {
      answerBody: String,
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      userAnswered: String,
      answeredOn: { type: Date, default: Date.now },
    },
  ],
});
QuestionSchema.index({ questionTitle: "text", questionBody: "text" });
module.exports = mongoose.model("Question", QuestionSchema);

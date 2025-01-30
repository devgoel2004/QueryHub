import mongoose from "mongoose";
const QuestionSchema = mongoose.Schema({
  questionTitle: {
    type: String,
    required: true,
  },
  questionBody: {
    type: String,
    required: true,
  },
  userPosted: {
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

  userId: {
    type: String,
  },
  postedOn: {
    type: Date,
    default: Date.now,
  },
  answer: [
    {
      answerBody: String,
      userAnswered: String,
      userId: String,
      answeredOn: { type: Date, default: Date.now },
    },
  ],
});
export default mongoose.model("Question", QuestionSchema);

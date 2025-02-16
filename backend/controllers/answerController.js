const Question = require("../models/questionModel");
const User = require("../models/userModel");
exports.postAnswer = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;
    const userAnswered = req.user.name;
    if (!userId || !userAnswered) {
      return res.status(404).json({
        success: false,
        message: "No User Id or User Name found",
      });
    }
    const { answerBody } = req.body;
    const question = await Question.findById(id);
    if (!question) {
      return res.status(404).json({
        success: false,
        message: "No question found",
      });
    }
    const newAnswer = {
      answerBody,
      userId,
      userAnswered,
      answeredOn: new Date(),
    };
    question.answer.push(newAnswer);
    question.noOfAnswers += 1;
    await question.save();
    res.status(200).json({
      success: true,
      message: "Answer added successfully",
      question,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error,
      message: "Internal Error",
    });
  }
};

exports.deleteAnswer = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { answerId } = req.query;
    const userId = req.user._id;
    const question = await Question.findById(id);
    if (!question) {
      return res.status(404).json({
        success: false,
        message: "No question found",
      });
    }
    const answerIndex = question.answer.findIndex(
      (ans) => ans._id.toString() === answerId
    );
    if (answerIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Answer not found",
      });
    }
    if (question.answer[answerIndex].userId.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized: You can only delete your other answer",
      });
    }
    question.answer.splice(answerIndex, 1);
    question.noOfAnswers = Math.max(0, question.noOfAnswers - 1);
    const deletedAnswer = await question.save();
    return res.status(200).json({
      success: true,
      message: "Deleted Successfully",
      deletedAnswer,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal error",
      error,
    });
  }
};

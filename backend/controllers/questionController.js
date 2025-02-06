const Question = require("../models/questionModel");
//ASK QUESTION
exports.askQuestion = async (req, res) => {
  try {
    const { questionTitle, questionBody, questionTags } = req.body;
    const user = req.user._id;
    const postQuestion = new Question({
      questionBody,
      questionTitle,
      questionTags,
      user,
    });
    if (!questionBody) {
      return res.status(401).json({
        success: false,
        message: "Question Body is required",
      });
    }
    if (!questionTitle) {
      return res.status(401).json({
        success: false,
        message: "Title is required",
      });
    }
    if (!questionTags) {
      return res.status(401).json({
        success: false,
        message: "Question Tags is required",
      });
    }
    const question = await postQuestion.save();
    res.status(200).json({
      success: true,
      message: "Question Posted successfully",
      question,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error,
    });
  }
};
//GET ALL QUESTIONS
exports.getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find();
    res.status(200).json({
      success: true,
      questions,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: error,
    });
  }
};
//DELETE QUESTIONS
exports.deleteQuestions = async (req, res) => {
  try {
    const { questionId } = req.body;
    const question = await Question.findById(questionId);
    if (!question) {
      return res.status(404).json({
        success: false,
        message: "Question not found",
      });
    }
    const deleteQuestion = await Question.findByIdAndDelete(questionId);
    res.status(200).json({
      success: true,
      message: "Question deleted successfull",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: error,
    });
  }
};

//VOTE QUESTIONS
exports.voteQuestion = async (req, res) => {
  try {
    const { value, userId, questionId } = req.body;
    const question = await Question.findOne({
      _id: questionId,
      user: userId,
    });
    if (!question) {
      return res.status(404).json({
        success: false,
        message: "No question found",
      });
    }
    const up = question.upVote;
    const down = questionId.downVote;
    if (value === 1) {
      up += 1;
    }
    if (value === -1) {
      down += 1;
    }
    const questionUpdate = await Question.findByIdAndUpdate(
      {
        questionId,
      },
      {
        upVote: up,
        downVote: down,
      }
    );
    res.status(200).json({
      success: true,
      message: "Voted successfully",
      questionUpdate,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error,
    });
  }
};

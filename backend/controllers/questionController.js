const Question = require("../models/questionModel");
//ASK QUESTION
exports.askQuestion = async (req, res) => {
  try {
    const { questionTitle, questionBody, questionTags } = req.body;

    const userId = req.user._id;
    const userName = req.user.name;
    const postQuestion = new Question({
      questionBody,
      questionTitle,
      questionTags,
      user: userId,
      userName,
    });
    if (!questionTitle) {
      return res.status(401).json({
        success: false,
        message: "Title is required",
      });
    }
    if (!questionBody) {
      return res.status(401).json({
        success: false,
        message: "Question Body is required",
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
    res.status(500).json({
      success: false,
      error,
    });
  }
};
//GET ALL QUESTIONS
exports.getAllQuestions = async (req, res) => {
  try {
    let { page, limit, search, tag, sortBy, order } = req.query;

    page = page || 1;
    limit = limit || 10;
    let filter = {};
    if (search && search.trim() !== "") {
      const searchRegex = new RegExp(search, "i");
      filter.$text = { $search: search };
    }
    if (tag) {
      filter.questionTags = tag;
    }
    const sortField = sortBy || "createdAt";
    const sortOrder = order === "asc" ? 1 : -1;
    const questions = await Question.find(filter)
      .sort({
        [sortField]: sortOrder,
      })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();
    const totalCount = await Question.countDocuments(filter);

    res.status(200).json({
      success: true,
      questions,
      totalPages: Math.ceil(totalCount / limit),
      currentPage: page,
      totalQuestions: totalCount,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error,
      message: "Internal Server Error",
    });
  }
};
//DELETE QUESTIONS
exports.deleteQuestions = async (req, res) => {
  try {
    const { id } = req.params;
    const question = await Question.findById(id);
    if (!question) {
      return res.status(404).json({
        success: false,
        message: "Question not found",
      });
    }
    const deleteQuestion = await Question.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Question deleted successfully",
      deleteQuestion,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error,
      message: "Internal Server Error",
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

//UPDATE QUESTION
exports.updateQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;
    const question = await Question.findById(id);
    if (!question) {
      return res.status(404).json({
        success: false,
        message: "No question found",
      });
    }
    const user_id = question.user;
    if (user_id !== userId) {
      return res.status(401).json({
        success: false,
        message: "Only user who created can update",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "internal error",
      error,
    });
  }
};

//GET SINGLE QUESTION
exports.getQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const question = await Question.findById(id);
    if (!question) {
      return res.status(404).json({
        success: false,
        message: "No question found",
      });
    }
    return res.status(200).json({
      success: true,
      question,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error,
      message: "Internal Server Error",
    });
  }
};

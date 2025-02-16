const Questions = require("../models/questionModel");
exports.getAllTags = async (req, res) => {
  try {
    const tags = await Questions.find({}, { questionTags: 1, _id: 0 });
    if (!tags) {
      return res.status(404).json({
        success: false,
        message: "No tags found",
      });
    }
    const allTags = tags.flatMap((q) => q.questionTags || []);
    const uniqueTags = [...new Set(allTags)];
    res.status(200).json({
      success: true,
      tags: uniqueTags,
      message: "All Tags found",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal sever error",
      error,
    });
  }
};

const {
  askQuestion,
  getAllQuestions,
  deleteQuestions,
  voteQuestion,
} = require("../controllers/questionController");
const { isAuthenticatedUser } = require("../middleware/authentication");
const express = require("express");
const router = express.Router();
router
  .route("/question")
  .post(isAuthenticatedUser, askQuestion)
  .get(getAllQuestions);
router
  .route("/question/:id")
  .delete(isAuthenticatedUser, deleteQuestions)
  .put(isAuthenticatedUser, voteQuestion);

module.exports = router;

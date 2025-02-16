const {
  askQuestion,
  getAllQuestions,
  deleteQuestions,
  voteQuestion,
  getQuestion,
  getTags,
} = require("../controllers/questionController");
const { isAuthenticatedUser } = require("../middleware/authentication");
const express = require("express");
const router = express.Router();
router.route("/").post(isAuthenticatedUser, askQuestion).get(getAllQuestions);
router
  .route("/:id")
  .delete(isAuthenticatedUser, deleteQuestions)
  .put(isAuthenticatedUser, voteQuestion)
  .get(getQuestion);

module.exports = router;

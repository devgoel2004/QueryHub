const { postAnswer, deleteAnswer } = require("../controllers/answerController");
const { isAuthenticatedUser } = require("../middleware/authentication");
const express = require("express");

const router = express.Router();
router.route(`/post/:id`).put(isAuthenticatedUser, postAnswer);
router.route(`/delete/:id`).delete(isAuthenticatedUser, deleteAnswer);
module.exports = router;

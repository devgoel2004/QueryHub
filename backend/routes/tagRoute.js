const express = require("express");
const router = express.Router();
const Questions = require("../models/questionModel");
const { getAllTags } = require("../controllers/tagController");
router.route(`/`).get(getAllTags);
module.exports = router;

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const passport = require("passport");
const fileUpload = require("express-fileupload");
const session = require("express-session");
const authRoute = require("./routes/authRoute");
const userRoute = require("./routes/userRoute");
const questionRoute = require("./routes/questionRoute");
const answerRoute = require("./routes/answerRoute");
const tagRoute = require("./routes/tagRoute");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const DB_URL = process.env.DB_URL;
mongoose
  .connect(DB_URL)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((error) => console.error("❌ MongoDB connection error:", error));
app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: true }));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(express.urlencoded({ extended: false }));
app.use(fileUpload());
app.use(passport.initialize());
//Routes
app.use("/auth", authRoute); // Google auth route
app.use("/user", userRoute);
app.use("/question", questionRoute);
app.use(`/answer`, answerRoute);
app.use(`/tags`, tagRoute);
app.get("/", (req, res) => {
  res.send("Server is working fine");
});
module.exports = app;

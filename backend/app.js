const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const passport = require("passport");
const fileUpload = require("express-fileupload");
const session = require("express-session");
const authRoute = require("./routes/authRoute");
const userRoute = require("./routes/userRoute");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("Connected");
  })
  .catch((err) => {
    console.log("Database error", err);
  });

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
app.get("/", (req, res) => {
  res.send("Server is working fine");
});
module.exports = app;

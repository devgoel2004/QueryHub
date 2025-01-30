const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const passport = require("passport");
const fileUpload = require("express-fileupload");
const authRoute = require("./routes/authRoute");
const connectDatabase = require("./config/db");
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: true }));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(fileUpload());
app.use(passport.initialize());
//connect database
connectDatabase;
//Routes
app.use("/", authRoute);
app.get("/", (req, res) => {
  res.send("Server is working fine");
});
module.exports = app;

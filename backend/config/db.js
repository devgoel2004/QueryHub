const mongoose = require("mongoose");
require("dotenv").config();
exports.connectDatabase = () => {
  mongoose
    .connect(process.env.DB_URL)
    .then(() => {
      console.log("Connected");
    })
    .catch((err) => {
      console.log("Database error", err);
    });
};

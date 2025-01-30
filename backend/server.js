const app = require("./app");
const dotenv = require("dotenv");
const cloudinary = require("cloudinary");
dotenv.config();
const port = process.env.PORT;
app.listen(port, () => {
  console.log("server is listening", port);
});

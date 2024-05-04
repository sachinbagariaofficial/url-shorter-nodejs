const express = require("express");
const app = express();
const shortURL = require("./routes/url");
const connectDB = require("./config/connect");
const cors = require("cors");
require("dotenv").config();
connectDB();
const Port = process.env.PORT;
app.use(cors());
app.use(express.json());

app.use("/url", shortURL);

app.listen(5001, () => {
  return console.log(`server is running on port ${Port || 5004}`);
});

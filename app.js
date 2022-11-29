require("dotenv").config();
const express = require("express");
require("./config/db").connect();
const app = express();
const cors = require("cors");

const userRoutes = require("./routes/userRoutes");

// MIDDLEWARE
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", userRoutes);

module.exports = app;

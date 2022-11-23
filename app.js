require("dotenv").config();
const express = require("express");
require("./config/db").connect();
const app = express();

const userRoutes = require("./routes/userRoutes");

// MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", userRoutes);

module.exports = app;

require("dotenv").config();
const express = require("express");
require("./config/db").connect();
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");

const todoRoutes = require("./routes/todoRoutes");
const tasksRoutes = require("./routes/tasksRoutes");
const userRoutes = require("./routes/userRoutes");

// MIDDLEWARE
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello world");
});

// Routes
app.use("/todo/v1", todoRoutes);
app.use("/todo/v1/tasks", tasksRoutes);
app.use("/todo/v1", userRoutes);

module.exports = app;

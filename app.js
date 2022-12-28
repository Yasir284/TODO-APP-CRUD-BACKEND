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
    origin: ["http://localhost:3000", "https://todo-app-crud.onrender.com"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_req, res) => {
  res.send("Hello world");
});

// Routes
app.use("/todo", todoRoutes);
app.use("/todo/tasks", tasksRoutes);
app.use("/todo", userRoutes);

module.exports = app;

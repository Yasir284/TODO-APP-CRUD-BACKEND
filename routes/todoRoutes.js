const express = require("express");
const router = express.Router();
const userAuth = require("../middleware/auth");

const {
  createTodo,
  getTodos,
  deleteTodo,
  updateTodo,
} = require("../controller/todosControllers");

// Routes for Todo
router.post("/createTodo", userAuth, createTodo);
router.get("/getTodos", userAuth, getTodos);
router.delete("/deleteTodo/:todoId", userAuth, deleteTodo);
router.put("/updateTodo/:todoId", userAuth, updateTodo);

module.exports = router;

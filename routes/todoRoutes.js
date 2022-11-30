const express = require("express");
const router = express.Router();

const {
  createTodo,
  getTodo,
  deleteTodo,
  updateTodo,
} = require("../controller/todosControllers");

// Routes for Todo
router.post("/createTodo", createTodo);
router.get("/getTodo", getTodo);
router.delete("/deleteTodo/:todoId", deleteTodo);
router.put("/updateTodo/:todoId", updateTodo);

module.exports = router;

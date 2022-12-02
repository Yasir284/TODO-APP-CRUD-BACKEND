const express = require("express");
const userAuth = require("../middleware/auth");
const router = express.Router();

const {
  createTask,
  getTodoById,
  deleteTask,
  updateTask,
} = require("../controller/tasksControllers");

// Routes for Tasks
router.put("/createTask/:todoId", userAuth, createTask);
router.get("/getTodoById/:todoId", userAuth, getTodoById);
router.delete("/deleteTask/:todoId/:taskId", userAuth, deleteTask);
router.put("/updateTask/:todoId/:taskId", userAuth, updateTask);

module.exports = router;

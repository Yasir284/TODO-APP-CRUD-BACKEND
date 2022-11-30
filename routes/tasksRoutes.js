const express = require("express");
const router = express.Router();

const {
  createTask,
  getTasks,
  deleteTask,
  updateTask,
} = require("../controller/tasksControllers");

// Routes for Tasks
router.put("/createTask/:todoId", createTask);
router.get("/getTasks/:todoId", getTasks);
router.delete("/deleteTask/:todoId/:taskId", deleteTask);
router.put("/updateTask/:todoId/:taskId", updateTask);

module.exports = router;

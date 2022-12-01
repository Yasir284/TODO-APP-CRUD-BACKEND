const express = require("express");
const userAuth = require("../middleware/auth");
const router = express.Router();

const {
  createTask,
  getTasks,
  deleteTask,
  updateTask,
} = require("../controller/tasksControllers");

// Routes for Tasks
router.put("/createTask/:todoId", userAuth, createTask);
router.get("/getTasks/:todoId", userAuth, getTasks);
router.delete("/deleteTask/:todoId/:taskId", userAuth, deleteTask);
router.put("/updateTask/:todoId/:taskId", userAuth, updateTask);

module.exports = router;

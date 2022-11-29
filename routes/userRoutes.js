const express = require("express");
const router = express.Router();

const home = require("../controller/home");
const {
  createTask,
  getTasks,
  deleteTask,
} = require("../controller/tasksControllers");
const {
  createTodo,
  getTodo,
  deleteTodo,
  updateTodo,
} = require("../controller/todosControllers");

router.get("/", home);

// Routes for Todo
router.route("/todo/v1/createTodo").post(createTodo);
router.route("/todo/v1/getTodo").get(getTodo);
router.route("/todo/v1/:todoId").delete(deleteTodo).put(updateTodo);

// Routes for Tasks
router.route("/todo/v1/tasks/:todoId").put(createTask).get(getTasks);
router.route("/todo/v1/tasks/:todoId/:taskId").delete(deleteTask);

module.exports = router;

const express = require("express");
const router = express.Router();

const home = require("../controller/home");
const {
  createTodo,
  getTodo,
  deleteTodo,
} = require("../controller/todosControllers");

router.get("/", home);
router.route("/todo/v1").post(createTodo).get(getTodo).delete(deleteTodo);

module.exports = router;

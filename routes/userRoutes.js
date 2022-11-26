const express = require("express");
const router = express.Router();

const home = require("../controller/userController");
const addTodo = require("../controller/addTodoController");
const deleteTodo = require("../controller/deleteTodoController");
const getTodo = require("../controller/getTodoController");

router.get("/", home);
router.post("/addTodo", addTodo);
router.delete("/deleteTodo/:id", deleteTodo);
router.get("/getTodo", getTodo);
module.exports = router;

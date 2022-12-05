// const Todo = require("../module/todo");
const User = require("../module/userSchema");
const Todo = require("../module/todoSchema");

exports.createTodo = async (req, res) => {
  try {
    const { title, tasks, textTheme, userId } = req.body;

    if (!title) {
      res.status(400).send("Title is mandatory");
      return;
    }
    const data = { title, tasks, textTheme };

    // Create todo
    const todo = await Todo.create(data);
    console.log(todo);

    // Push Id to User schema
    const result = await User.findByIdAndUpdate(
      { _id: userId },
      { $push: { todos: todo._id } }
    );

    res.status(200).json({
      sucess: true,
      message: "Todo created successfully",
      todo,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
    return;
  }
};

exports.getTodos = async (req, res) => {
  try {
    const user = await User.findById(req.body.userId).populate("todos");
    console.log(user);

    const todos = user.todos;

    if (!todos) {
      res.status(400).send("Can not get todos");
    }

    res.status(200).json({
      sucess: true,
      todos,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const userId = req.body.userId;
    const todoId = req.params.todoId;
    const deleteTodo = await Todo.findByIdAndDelete({ _id: todoId });
    const deleteFromUser = await User.updateOne(
      { _id: userId },
      { $pull: { todos: todoId } }
    );
    res.status(200).json({
      sucess: true,
      message: "Todo deleted from DB",
    });
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
};

exports.updateTodoTitle = async (req, res) => {
  try {
    const todoId = req.params.todoId;

    const updateTodo = await Todo.findByIdAndUpdate(
      { _id: todoId },
      { title: req.body.title }
    );

    res.status(200).json({
      sucess: true,
      message: "Todo updated sucessfully",
    });
  } catch (error) {
    console.log(error);
    req.status(400).send("Todo update failed");
  }
};

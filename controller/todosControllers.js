const Todo = require("../module/todo");
const User = require("../module/user");

exports.createTodo = async (req, res) => {
  try {
    const { title, tasks, textTheme, userId } = req.body;
    console.log(title);

    if (!title) {
      res.status(400).send("Title is mandatory");
      return;
    }
    const todo = { title, tasks, textTheme };

    const result = await User.updateOne(
      { _id: userId },
      { $push: { todos: todo } }
    );
    res.status(200).json({
      sucess: true,
      todo,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
    return;
  }
};

exports.getTodo = async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);
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
    const deleteTodo = await User.updateOne(
      { _id: userId },
      {
        $pull: {
          todos: { _id: todoId },
        },
      }
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

exports.updateTodo = async (req, res) => {
  try {
    const userId = req.body.userId;
    const todoId = req.params.todoId;

    const updateTodo = await User.updateOne(
      { _id: userId, "todos._id": todoId },
      {
        $set: {
          todos: req.body,
        },
      }
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

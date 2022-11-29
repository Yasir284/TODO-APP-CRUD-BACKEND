const Todo = require("../module/todo");

exports.createTodo = async (req, res) => {
  try {
    const { title, tasks, textTheme } = req.body;
    console.log(title);

    if (!title) {
      res.status(400).send("Title is mandatory");
    }

    const todo = await Todo.create({
      title,
      tasks,
      textTheme,
    });

    res.status(200).json({
      sucess: true,
      todo,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
};

exports.getTodo = async (req, res) => {
  try {
    const todos = await Todo.find();
    console.log(todos);

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
    const deleteTodo = await Todo.findByIdAndDelete(req.params.todoId);
    console.log(deleteTodo);

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
    const todoId = req.params.todoId;
    console.log(todoId);

    const data = await Todo.findByIdAndUpdate(todoId, req.body);
    console.log(data);

    res.status(200).json({
      sucess: true,
      message: "Todo updated sucessfully",
    });
  } catch (error) {
    console.log(error);
    req.status(400).send("Todo update failed");
  }
};

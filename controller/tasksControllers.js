const Todo = require("../module/todo");

exports.createTask = async (req, res) => {
  try {
    const todoId = req.params.todoId;

    const task = req.body;

    // Find todo by id
    const todo = await Todo.findById({ _id: todoId });
    console.log(todo);

    if (!todo) {
      res.status(400).send("Todo not found");
    }

    // Add Task to DB
    todo.tasks.push(task);

    todo.save();

    res.status(400).json({
      sucess: true,
      message: "Todo added sucessfully",
      todo,
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).send("Error in adding task to DB");
  }
};

exports.getTasks = async (req, res) => {
  try {
    const todoId = req.params.todoId;

    const todo = await Todo.findById({ _id: todoId });

    if (!todo) {
      res.status(400).send("Failed to get Todo");
    }
    console.log(todo);

    res.status(200).json({
      sucess: true,
      todo,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send("Error in response route");
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { todoId, taskId } = req.params;

    const findAndDelete = await Todo.update(
      { _id: todoId },
      {
        $pull: {
          tasks: { _id: taskId },
        },
      }
    );
    console.log(findAndDelete);

    res.status(200).json({
      success: true,
      message: "tasks successfully deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(400).send("Error in response route");
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { todoId, taskId } = req.params;

    const updateTask = await Todo.update(
      { _id: todoId, _id: taskId },
      {
        $set: {
          tasks: { task: req.body.task },
        },
      }
    );
    console.log(update);

    res.status(200).send("Sucess");
  } catch (error) {
    console.log(error);
    res.status(400).send("Error in response route");
  }
};

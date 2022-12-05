const User = require("../module/userSchema");

exports.createTask = async (req, res) => {
  try {
    const userId = req.body.userId;
    const todoId = req.params.todoId;

    const { task } = req.body;

    // Find todo by id
    const updateTask = await User.updateOne(
      { _id: userId, "todos._id": todoId },
      {
        $push: {
          "todos.$[].tasks": {
            task,
            taskCreatedAt: Date.now(),
            taskUpdatedAt: Date.now(),
          },
        },
      }
    );

    res.status(200).json({
      sucess: true,
      message: "Todo added sucessfully",
      task,
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).send("Error in adding task to DB");
  }
};

exports.getTodoById = async (req, res) => {
  try {
    const userId = req.body.userId;
    const todoId = req.params.todoId;

    const user = await User.findById({ _id: userId });

    const todo = user.todos.filter((todo) => todo._id == todoId);
    console.log(todo);

    if (!todo || todo.length === 0) {
      res.status(400).send("Todo not found");
    }

    res.status(200).json({
      sucess: true,
      todo,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error in response route");
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const userId = req.body.userId;
    const { todoId, taskId } = req.params;

    const findAndDelete = await User.updateOne(
      { _id: userId, "todos._id": todoId },
      {
        $pull: {
          "todos.$.tasks": { _id: taskId },
        },
      }
    );

    res.status(200).json({
      success: true,
      message: "tasks successfully deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(400).send("Error in response route");
  }
};

exports.updateTask = async (req, res) => {};

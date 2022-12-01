const User = require("../module/user");

exports.createTask = async (req, res) => {
  try {
    const userId = req.body.userId;
    const todoId = req.params.todoId;

    const { task, dueDate } = req.body;

    // Find todo by id
    const updateTask = await User.updateOne(
      { _id: userId, "todos._id": todoId },
      {
        $push: {
          "todos.$[].tasks": { task, dueDate },
        },
      }
    );

    res.status(200).json({
      sucess: true,
      message: "Todo added sucessfully",
      task,
      dueDate,
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).send("Error in adding task to DB");
  }
};

exports.getTasks = async (req, res) => {
  try {
    const userId = req.body.userId;
    const todoId = req.params.todoId;
    // 6388ad689e07fd838ae05b3b
    // 6388ad7d9e07fd838ae05b3f
    const user = await User.findById({ _id: userId });
    const todo = user.todos.filter((todo) => todo._id == todoId);
    console.log(todo);
    // JSON.parse(JSON.stringify(todo))
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

exports.updateTask = async (req, res) => {
  try {
    const userId = req.body.userId;
    const { todoId, taskId } = req.params;
    // console.log(newTask);

    const { task, isCompleted, isImportant, dueDate } = req.body;
    const data = {
      task,
      isCompleted,
      isImportant,
      taskUpdatedAt: Date.now(),
      dueDate,
    };

    // Find and update task
    const user = await User.findById({ _id: userId });

    const tasks = user.todos.filter((todo) => todo._id == todoId)[0].tasks;
    // console.log("tasks:", tasks);

    const updatedTasks = tasks.map((task) => {
      if (task._id != taskId) {
        return task;
      } else return (task = data);
    });

    const updateTodo = await User.updateOne(
      { _id: userId, "todos._id": todoId },
      {
        $set: {
          "todos.$.tasks": updatedTasks,
        },
      }
    );

    res.status(200).json({
      success: true,
      message: "Task updated sucessfully",
    });
  } catch (error) {
    console.log(error);
    res.status(400).send("Error in response route");
  }
};

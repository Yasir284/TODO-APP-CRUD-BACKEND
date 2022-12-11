const User = require("../module/userSchema");
const Todo = require("../module/todoSchema");
const ObjectId = require("mongoose/lib/types/objectid");

exports.createTask = async (req, res) => {
  try {
    const todoId = req.params.todoId;

    const { task } = req.body;

    const data = {
      task,
      taskCreatedAt: Date.now(),
      taskUpdatedAt: Date.now(),
    };

    // Find todo by id
    const todo = await Todo.updateOne(
      { _id: todoId },
      { $push: { tasks: data } }
    );

    res.status(200).json({
      success: true,
      message: "Todo added successfully",
      task,
    });
  } catch (error) {
    console.log(error.message);
    res
      .status(400)
      .json({ success: false, message: "Error in adding task to DB" });
  }
};

exports.getTodoById = async (req, res) => {
  try {
    const userId = req.body.userId;
    const todoId = req.params.todoId;

    const user = await User.findById({ _id: userId }).populate("todos");

    const todo = user.todos.filter((todo) => todo._id == todoId);
    console.log(todo);

    if (!todo || todo.length === 0) {
      res.status(400).json({ success: false, message: "Todo not found" });
    }

    res.status(200).json({
      success: true,
      todo,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Error in response route" });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { todoId, taskId } = req.params;

    const todo = await Todo.findById({ _id: todoId });

    const updatedTask = todo.tasks.filter((task) => task._id != taskId);

    todo.tasks = updatedTask;
    console.log(todo);

    const updateTodo = await Todo.findByIdAndUpdate({ _id: todoId }, todo);

    res.status(200).json({
      success: true,
      message: "tasks successfully deleted",
      todo,
    });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ success: false, message: "Error in response route" });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { todoId, taskId } = req.params;
    console.log(taskId);
    const { task, isCompleted, isImportant } = req.body;

    const todo = await Todo.updateOne(
      { tasks: { $elemMatch: { _id: taskId } } },
      {
        $set: {
          "tasks.$": {
            task,
            isImportant,
            isCompleted,
            taskUpdatedAt: Date.now(),
          },
        },
      }
    );
    console.log(todo);
    // if (!todo) {
    //   res.status(400).json({ success: false, message: "Cann't find todo" });
    // }
    // console.log("tasks", todo.tasks.findById(taskId));
    // const updatedTask = todo.tasks.forEach((e) => {
    //   console.log(e._id == taskId);
    //   if (e._id == taskId) {
    //     e = {
    //       _id: e._id,
    //       task,
    //       isImportant,
    //       isCompleted,
    //       taskCreatedAt: e.taskCreatedAt,
    //       taskUpdatedAt: Date.now(),
    //     };
    //   }
    // });

    // todo.tasks = updatedTask;
    // console.log(todo);

    // const updateTodo = await Todo.findByIdAndUpdate({ _id: todoId }, todo);

    res.status(200).json({
      success: true,
      message: "tasks updated successfully",
    });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ success: false, message: "Error in response route" });
  }
};

exports.searchTasks = async (req, res) => {};

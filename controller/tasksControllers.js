const Todo = require("../module/todo");

const addTask = async (req, res) => {
  try {
    const task = await Todo.findByIdAndUpdate(req.params.id, req.body);
    console.log(task);

    if (!task) {
      res.status(400).send("Task not found in req.body");
    }

    res.status(200).json({
      sucess: true,
      message: "Task added sucessfully",
      task,
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).send("Error in adding task to DB");
  }
};

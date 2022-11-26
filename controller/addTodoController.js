const Todo = require("../module/todo");

const addTodo = async (req, res) => {
  try {
    const { title } = req.body;
    console.log(title);

    if (!title) {
      res.status(400).send("Title is mandatory");
    }

    const todo = await Todo.create({
      title,
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

module.exports = addTodo;

const Todo = require("../module/todo");

const getTodo = async (req, res) => {
  try {
    const todos = await Todo.find();
    console.log(todos);

    if (!todos) {
      res.status(400).send("Can not get todos");
    }

    res.status(400).json({
      sucess: true,
      todos,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
};

module.exports = getTodo;

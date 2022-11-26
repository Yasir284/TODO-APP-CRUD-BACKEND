const Todo = require("../module/todo");

const deleteTodo = async (req, res) => {
  try {
    const deleteTodo = await Todo.findByIdAndDelete(req.params.id);
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

module.exports = deleteTodo;

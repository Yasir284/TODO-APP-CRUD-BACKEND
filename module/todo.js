const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  todo: String,
  tasks: [],
});

module.exports = mongoose.model("todo", todoSchema);

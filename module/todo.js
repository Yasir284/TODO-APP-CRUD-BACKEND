const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    require: [true, "Field is required"],
  },
  tasks: [],
});

module.exports = mongoose.model("todo", todoSchema);

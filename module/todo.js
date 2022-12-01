const mongoose = require("mongoose");

const tasksSchema = mongoose.Schema({
  task: String,
  isCompleted: {
    type: Boolean,
    default: false,
  },
  isImportant: {
    type: Boolean,
    default: false,
  },
  taskCreatedAT: {
    type: Date,
    default: Date.now(),
  },
  taskUpdatedAt: {
    type: Date,
    default: Date.now(),
  },
  dueDate: {
    type: Date,
    default: null,
  },
});

const todoSchema = mongoose.Schema(
  {
    title: {
      type: String,
      require: [true, "Field is required"],
    },
    textTheme: {
      type: String,
      default: null,
    },
    tasks: [tasksSchema],
  },
  { timestamps: true }
);

const Todo = mongoose.model("Todo", todoSchema);
module.exports = Todo;

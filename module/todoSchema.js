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
  taskCreatedAt: { type: Date },
  taskUpdatedAt: { type: Date, default: Date.now() },
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
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const Todo = mongoose.model("Todo", todoSchema);
module.exports = Todo;

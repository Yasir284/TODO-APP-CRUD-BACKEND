const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: [true, "Field is required"],
    },
    textTheme: {
      type: String,
      default: null,
    },
    tasks: [
      {
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
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("todo", todoSchema);

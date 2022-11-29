const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: [true, "Field is required"],
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
        textTheme: {
          type: String,
          default: null,
        },
        taskCreatedDate: {
          type: Date,
          default: Date.now,
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

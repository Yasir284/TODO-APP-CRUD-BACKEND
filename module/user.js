const mongoose = require("mongoose");

const emailValidation = function (email) {
  const emailRegex =
    /^(?:(?:[\w`~!#$%^&*\-=+;:{}'|,?\/]+(?:(?:\.(?:"(?:\\?[\w`~!#$%^&*\-=+;:{}'|,?\/\.()<>\[\] @]|\\"|\\\\)*"|[\w`~!#$%^&*\-=+;:{}'|,?\/]+))*\.[\w`~!#$%^&*\-=+;:{}'|,?\/]+)?)|(?:"(?:\\?[\w`~!#$%^&*\-=+;:{}'|,?\/\.()<>\[\] @]|\\"|\\\\)+"))@(?:[a-zA-Z\d\-]+(?:\.[a-zA-Z\d\-]+)*|\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\])$/;
  return emailRegex.test(email);
};

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
  taskCreatedAt: { type: Date, default: Date.now() },
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

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is compulsory"],
    },
    email: {
      type: String,
      required: [true, "Email is compulsory"],
      unique: [true, "Email already exist"],
      validate: [emailValidation, "Enter valid email"],
    },
    password: {
      type: String,
      required: [true, "Password is compulsory"],
      minLength: [8, "Password should contain more than 8 character"],
    },
    token: {
      type: String,
      default: null,
    },
    todos: [todoSchema],
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

module.exports = mongoose.model("User", userSchema);

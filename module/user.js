const mongoose = require("mongoose");

const emailValidation = function (email) {
  const emailRegex =
    /^(?:(?:[\w`~!#$%^&*\-=+;:{}'|,?\/]+(?:(?:\.(?:"(?:\\?[\w`~!#$%^&*\-=+;:{}'|,?\/\.()<>\[\] @]|\\"|\\\\)*"|[\w`~!#$%^&*\-=+;:{}'|,?\/]+))*\.[\w`~!#$%^&*\-=+;:{}'|,?\/]+)?)|(?:"(?:\\?[\w`~!#$%^&*\-=+;:{}'|,?\/\.()<>\[\] @]|\\"|\\\\)+"))@(?:[a-zA-Z\d\-]+(?:\.[a-zA-Z\d\-]+)*|\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\])$/;
  return emailRegex.test(email);
};

const userSchema = mongoose.Schema({
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
});

module.exports = mongoose.model("User", userSchema);

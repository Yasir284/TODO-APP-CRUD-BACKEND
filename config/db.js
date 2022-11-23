const mongoose = require("mongoose");

const { MONGODB_URL } = process.env;

exports.connect = () => {
  mongoose
    .connect(MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(console.log("DATABASE CONNECTION SUCESSFUL"))
    .catch((error) => {
      console.log(error);
      console.log("DATABASE CONNECTION FAILED");
      process.exit(1);
    });
};

const User = require("../module/userSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const TOKEN_SECRET = process.env.TOKEN_SECRET;

exports.userSignUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // Check if all the fields are there
    if (!(name && email && password)) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are mandatory" });
    }

    // Check if user already exist
    const checkIfUserExist = await User.findOne({ email });
    if (checkIfUserExist) {
      return res.status(400).json({
        success: false,
        message: "User already exist, With this email id!",
      });
    }

    // Encrypt password and create user
    const encryptedPass = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: encryptedPass,
    });

    const token = jwt.sign(
      {
        id: user._id,
      },
      TOKEN_SECRET,
      { expiresIn: "4h" }
    );

    user.token = token;
    user.password = undefined;

    res.status(200).json({
      success: true,
      message: `Hello ${name}, Your account is created successfully`,
      user,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Error in response route" });
  }
};

exports.userSignIn = async (req, res) => {
  try {
    // Req data
    // console.log(req);
    const { email, password } = req.body;

    // Check if all the requested data is available
    if (!(email && password)) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are mandatory" });
    }

    // Validate if user exist and varify the password and send response accordingly
    const user = await User.findOne({ email });

    if (!(user && bcrypt.compare(user.password, password))) {
      return res
        .status(400)
        .json({ success: false, message: "Email or Password is incorrect" });
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      TOKEN_SECRET,
      { expiresIn: "24h" }
    );

    user.token = token;
    user.password = undefined;

    const userInfo = {
      name: user.name,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    res
      .status(200)
      .cookie("signIn", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 2 * 24 * 3600000),
      })
      .json({
        success: true,
        message: "Logged In Successfully",
        user: userInfo,
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in response route",
    });
  }
};

exports.userSignOut = (_req, res) => {
  try {
    res.clearCookie("signIn");
    res.status(200).json({ success: true, message: "Signout successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in response route",
    });
  }
};

exports.isSignedIn = async (req, res) => {
  const userId = req.body.userId;
  if (!userId) {
    return res
      .status(400)
      .json({ success: false, message: "User is not logged in" });
  }
  const user = await User.findById(
    { _id: userId },
    "-email -password -todos -token"
  );

  res.status(200).json({ success: true, message: "User is logged in", user });
};

exports.getUsers = async (_req, res) => {
  try {
    const users = await User.find().populate("todos");
    console.log(users);

    if (!users) {
      res.status(400).send("Failed to find users");
    }

    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};

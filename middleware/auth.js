const jwt = require("jsonwebtoken");
const TOKEN_SECRET = process.env.TOKEN_SECRET;

const userAuth = async (req, res, next) => {
  const bearerToken = req.header("Authorization")
    ? req.header("Authorization").replace("Bearer ", "")
    : "";

  console.log("cookie:", req.cookies.signIn);
  const token = req.cookies.signIn || bearerToken;

  if (!token) {
    res.status(400).json({ success: false, message: "Token not found" });
    return;
  }

  try {
    const decode = jwt.verify(token, TOKEN_SECRET);
    req.body.userId = decode.id;
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: "Error in middleware" });
    return;
  }

  return next();
};

module.exports = userAuth;

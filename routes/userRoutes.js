const express = require("express");
const router = express.Router();
const {
  userSignUp,
  userSignIn,
  userSignOut,
  getUsers,
} = require("../controller/authController");

router.post("/u/signUp", userSignUp);
router.get("/u/signIn", userSignIn);
router.get("/u/signOut", userSignOut);
router.get("/u/getUsers", getUsers);

module.exports = router;

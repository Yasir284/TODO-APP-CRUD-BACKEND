const express = require("express");
const router = express.Router();
const {
  userSignUp,
  userSignIn,
  userSignOut,
  getUsers,
  getUser,
  isSignedIn,
} = require("../controller/authController");
const userAuth = require("../middleware/auth");

router.post("/u/signUp", userSignUp);
router.post("/u/signIn", userSignIn);
router.get("/u/signOut", userSignOut);
router.get("/u/getUsers", getUsers);
router.get("/u/getUser", getUser);
router.get("/u/isSignedIn", userAuth, isSignedIn);

module.exports = router;

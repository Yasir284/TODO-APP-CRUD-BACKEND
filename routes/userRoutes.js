const express = require("express");
const router = express.Router();
const {
  userSignUp,
  userSignIn,
  userSignOut,
} = require("../controller/authController");

router.post("/u/signUp", userSignUp);
router.get("/u/signIn", userSignIn);
router.get("/u/signOut", userSignOut);

module.exports = router;

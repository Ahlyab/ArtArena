const express = require("express");
const {
  user_signup,
  user_login,
  user_signout,
} = require("../Controller/UserController");
const router = express.Router();

router.post("/signup_user", user_signup);
router.post("/login_user", user_login);
router.post("/logout_user", user_signout);

module.exports = router;

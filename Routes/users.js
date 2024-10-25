const express = require("express");
const { user_signup, user_login } = require("../Controller/UserController");
const router = express.Router();

router.post("/signup_user", user_signup);
router.post("/login_user", user_login);

module.exports = router;

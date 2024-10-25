const express = require("express");
const { user_signup } = require("../Controller/UserController");
const router = express.Router();

router.post("/signup_user", user_signup);

module.exports = router;

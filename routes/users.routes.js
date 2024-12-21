const express = require("express");
const {user_signup} = require("../controllers/User/signup_user");
const {user_login} = require("../controllers/User/login_user");
const {user_signout} = require("../controllers/User/signout_user");

const router = express.Router();

router.post("/signup_user", user_signup);
router.post("/login_user", user_login);
router.post("/logout_user", user_signout);

module.exports = router;

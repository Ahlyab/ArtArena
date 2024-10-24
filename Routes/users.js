const express = require("express");
const router = express.Router();

// use express json
router.use(express.json());

/**
 * @swagger
 * /api/users/signup_user:
 *   post:
 *     summary: Create a new user
 *     description: Create a new user with email, password, first name, last name and user_type
 *     tags:
 *      - users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - firstName
 *               - lastName
 *               - user_type
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: johndoe@example.com
 *                 description: The user's unique email address (must be valid and unique)
 *               password:
 *                 type: string
 *                 format: password
 *                 example: Password123!
 *                 description: The user's password (must be strong and secure)
 *               firstName:
 *                 type: string
 *                 example: John
 *                 description: The user's first name (required for personalization)
 *               lastName:
 *                 type: string
 *                 example: Doe
 *                 description: The user's last name (required for proper identification)
 *               user_type:
 *                 type: string
 *                 example: user
 *     responses:
 *       200:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User created
 */

router.post("/signup_user", (req, res) => {
  // check if first name, last name, email, and password are provided one by one
  if (!req.body.firstName) {
    return res.status(400).json({ message: "First name is required" });
  }
  if (!req.body.lastName) {
    return res.status(400).json({ message: "Last name is required" });
  }
  if (!req.body.email) {
    return res.status(400).json({ message: "Email is required" });
  }
  if (!req.body.password) {
    return res.status(400).json({ message: "Password is required" });
  }
  // check if email is valid
  const emailRegex = /\S+@\S+\.\S+/;
  if (!emailRegex.test(req.body.email)) {
    return res.status(400).json({ message: "Email is invalid" });
  }
  // check if password is strong and secure
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
  if (!passwordRegex.test(req.body.password)) {
    return res.status(400).json({ message: "Password is weak" });
  }
  // create user
  return res.status(200).json({ message: "User created" });
});

module.exports = router;

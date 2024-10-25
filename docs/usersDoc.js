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

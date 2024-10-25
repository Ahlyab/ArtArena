/**
 * @swagger
 * /api/users/signup_user:
 *   post:
 *     summary: Create a new user
 *     description: Create a new user with email, password, first name, last name and user_type
 *     tags:
 *       - users
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
 *               password:
 *                 type: string
 *                 format: password
 *                 example: Password123!
 *               firstName:
 *                 type: string
 *                 example: John
 *               lastName:
 *                 type: string
 *                 example: Doe
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
 *                   example: User created successfully
 *                 user:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 671b9f1d45cd34c2e061d4f2
 *                     firstName:
 *                       type: string
 *                       example: John
 *                     lastName:
 *                       type: string
 *                       example: Doe
 *                     email:
 *                       type: string
 *                       example: johndoe2@example.com
 *                     user_type:
 *                       type: string
 *                       example: user
 *                     __v:
 *                       type: integer
 *                       example: 0
 *                 status:
 *                   type: integer
 *                   example: 200
 */

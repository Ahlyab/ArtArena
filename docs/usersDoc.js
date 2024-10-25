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

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Login an existing user
 *     description: Authenticate a user with email, password, and user_type, and receive a JWT token in the response cookie.
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
 *               - user_type
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: johndoe3@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: SecurePass12p
 *               user_type:
 *                 type: string
 *                 example: client
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         headers:
 *           Set-Cookie:
 *             schema:
 *               type: string
 *               example: token=jwt_token_here; Path=/; HttpOnly; Max-Age=86400
 *             description: JWT token sent in a cookie for authenticated access.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User logged in successfully
 *                 user:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 671ba2f8800c812a40f7f8ab
 *                     firstName:
 *                       type: string
 *                       example: John
 *                     lastName:
 *                       type: string
 *                       example: Doe5
 *                     email:
 *                       type: string
 *                       example: johndoe3@example.com
 *                     user_type:
 *                       type: string
 *                       example: client
 *                     __v:
 *                       type: integer
 *                       example: 0
 *                 status:
 *                   type: integer
 *                   example: 200
 *       400:
 *         description: Bad request, validation failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Email or password is incorrect
 */

/**
 * @swagger
 * /api/protected:
 *   get:
 *     summary: Access a protected route
 *     description: This endpoint can only be accessed by authenticated users with a valid JWT token in the cookies.
 *     tags:
 *       - Protected-route testing
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Successfully accessed the protected route
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: This is a protected route
 *       401:
 *         description: Unauthorized access - token is missing or invalid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Unauthorized
 */

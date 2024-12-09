/**
 * @swagger
 * tags:
 *   name: Messages
 *   description: Message management API for Artists and Clients
 */

/**
 * @swagger
 * /api/messages/{id}:
 *   get:
 *     summary: Retrieve messages for a conversation
 *     tags: [Messages]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user to chat with
 *     responses:
 *       200:
 *         description: A list of messages in the conversation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   senderId:
 *                     type: string
 *                   receiverId:
 *                     type: string
 *                   message:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/messages/send/{id}:
 *   post:
 *     summary: Send a message to a user
 *     tags: [Messages]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the receiver
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 description: Message content
 *               receiverType:
 *                 type: string
 *                 enum: [Artist, Client]
 *                 description: Specifies the type of the receiver
 *             required:
 *               - message
 *               - receiverType
 *     responses:
 *       201:
 *         description: Message sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 senderId:
 *                   type: string
 *                 receiverId:
 *                   type: string
 *                 message:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/messages/users:
 *   get:
 *     summary: Retrieve a list of users for the sidebar
 *     tags: [Messages]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of users participating in conversations with the logged-in user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: User ID
 *                   firstName:
 *                     type: string
 *                     description: First name of the user
 *                   lastName:
 *                     type: string
 *                     description: Last name of the user
 *                   email:
 *                     type: string
 *                     description: User's email address
 *                   profilePhoto:
 *                     type: string
 *                     description: URL of the user's profile photo
 *       500:
 *         description: Internal Server Error
 */

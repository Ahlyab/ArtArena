/**
 * @swagger
 * tags:
 *   name: Notifications
 *   description: Art nofitifcation management
 */

/**
 * @swagger
 * /api/notifications/get_notifications:
 *   get:
 *     summary: Retrieve user notifications
 *     tags:
 *       - Notifications
 *     responses:
 *       200:
 *         description: Notifications retrieved successfully.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /api/notifications/read_notification:
 *   post:
 *     summary: Update a notification as read
 *     description: Marks a specific notification as read and returns the updated notification along with the count of unseen notifications for the user.
 *     tags:
 *       - Notifications
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: The ID of the notification to update.
 *                 example: "63f2a9f5f5c5e2d5b8f1a9c3"
 *     responses:
 *       200:
 *         description: Notification updated successfully and unseen count retrieved.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 notification:
 *                   type: object
 *                   description: The updated notification object.
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "63f2a9f5f5c5e2d5b8f1a9c3"
 *                     read:
 *                       type: boolean
 *                       example: true
 *                 status:
 *                   type: number
 *                   example: 200
 *                 unseen_count:
 *                   type: number
 *                   description: The count of unseen notifications for the user.
 *                   example: 5
 *       400:
 *         description: Bad Request or an error occurred.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message.
 *                   example: "Notification id is required"
 *                 status:
 *                   type: number
 *                   example: 400
 */

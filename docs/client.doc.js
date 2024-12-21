/**
 * @swagger
 
 * /api/client/get_clients:
 *   get:
 *     summary: Get all clients
 *     description: Retrieves a list of all clients.
 *     tags: [Clients]
 *     responses:
 *       200:
 *         description: List of clients retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 clients:
 *                   type: array
 *                   items:
 *                     $ref: '#/definitions/Client'
 *                 status:
 *                   type: number
 *                   example: 200
 *       400:
 *         description: Bad request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error message"

 * /api/client/update_client/{id}:
 *   put:
 *     summary: Update an existing client's information
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Client ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Updated email address
 *                 example: updated_email@example.com
 *               password:
 *                 type: string
 *                 description: Updated password
 *                 example: NewPassword123
 *               firstName:
 *                 type: string
 *                 description: Updated first name
 *                 example: Jane
 *               lastName:
 *                 type: string
 *                 description: Updated last name
 *                 example: Doe
 *               user_type:
 *                 type: string
 *                 description: User type (must be 'client')
 *                 example: client
 *               profilePhoto:
 *                 type: string
 *                 description: URL of profile photo
 *               location:
 *                 type: object
 *                 properties:
 *                   type:
 *                     type: string
 *                     example: Point
 *                   coordinates:
 *                     type: array
 *                     items:
 *                       type: number
 *                     example: [103.851959, 1.290270]
 *     responses:
 *       200:
 *         description: Client updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Client updated successfully
 *                 client:
 *                   $ref: '#/components/schemas/Client'
 *       400:
 *         description: Bad request (Invalid input or missing required fields)
 *       404:
 *         description: Client not found

 * /api/client/delete_client/{id}:
 *   delete:
 *     summary: Delete a client
 *     description: Deletes a client by ID.
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the client to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Client deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Client deleted successfully"
 *       400:
 *         description: Bad request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Id is required"
 *       404:
 *         description: Client not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Client not found"

 * /api/client/get_client/{id}:
 *   get:
 *     summary: Get a specific client
 *     description: Retrieves a client by ID.
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the client to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Client retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 client:
 *                   $ref: '#/definitions/Client'
 *                 status:
 *                   type: number
 *                   example: 200
 *       400:
 *         description: Bad request. Missing ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Id is required"
 *       404:
 *         description: Client not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Client not found"
 */

/**
 * @swagger
 * /api/client/create_client:
 *   post:
 *     summary: Create a new client
 *     tags: [Clients]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Client's email
 *                 example: client@example.com
 *               password:
 *                 type: string
 *                 description: Client's password (must contain at least one uppercase letter, one lowercase letter, one number, and be 8 characters or longer)
 *                 example: Password123
 *               firstName:
 *                 type: string
 *                 description: Client's first name
 *                 example: John
 *               lastName:
 *                 type: string
 *                 description: Client's last name
 *                 example: Doe
 *               user_type:
 *                 type: string
 *                 description: User type (client or admin)
 *                 example: client
 *               location:
 *                 type: object
 *                 properties:
 *                   type:
 *                     type: string
 *                     example: Point
 *                   coordinates:
 *                     type: array
 *                     items:
 *                       type: number
 *                     example: [103.851959, 1.290270]
 *     responses:
 *       201:
 *         description: Client created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: client created successfully
 *                 client:
 *                   $ref: '#/components/schemas/Client'
 *       400:
 *         description: Bad request (Invalid input or missing required fields)
 */

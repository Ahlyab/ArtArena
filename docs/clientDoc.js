/**
 * @swagger
 * /api/client/create_client:
 *   post:
 *     summary: Create a new client
 *     description: Creates a new client. All required fields must be provided.
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
 *                 format: email
 *                 example: "client@example.com"
 *                 description: The email of the client.
 *               password:
 *                 type: string
 *                 example: "StrongPassword123!"
 *                 description: The password of the client (hashed).
 *               firstName:
 *                 type: string
 *                 example: "John"
 *                 description: The first name of the client.
 *               lastName:
 *                 type: string
 *                 example: "Doe"
 *                 description: The last name of the client.
 *               user_type:
 *                 type: string
 *                 enum: [artist, client, admin]
 *                 example: "client"
 *                 description: The user type of the client.
 *     responses:
 *       201:
 *         description: Client created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "client created successfully"
 *                 client:
 *                   $ref: '#/definitions/Client'
 *                 status:
 *                   type: number
 *                   example: 200
 *       400:
 *         description: Bad request. Invalid input or missing fields.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Email is required"

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
 *     summary: Update a client
 *     description: Updates an existing client by ID. Only the fields provided in the request body will be updated.
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the client to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "client@example.com"
 *                 description: The email of the client.
 *               password:
 *                 type: string
 *                 example: "StrongPassword123!"
 *                 description: The password of the client (hashed if provided).
 *               firstName:
 *                 type: string
 *                 example: "John"
 *                 description: The first name of the client.
 *               lastName:
 *                 type: string
 *                 example: "Doe"
 *                 description: The last name of the client.
 *               user_type:
 *                 type: string
 *                 enum: [artist, client, admin]
 *                 example: "client"
 *                 description: The user type of the client.
 *               profilePhoto:
 *                 type: string
 *                 example: "http://example.com/profile.jpg"
 *                 description: The URL of the client's profile photo.
 *               address:
 *                 type: string
 *                 example: "123 Main St, City, Country"
 *                 description: The address of the client.
 *               bought:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: ObjectId
 *                 description: The IDs of the art items bought by the client.
 *               spentAmount:
 *                 type: number
 *                 example: 1500
 *                 description: The total amount spent by the client.
 *     responses:
 *       200:
 *         description: Client updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Client updated successfully"
 *                 client:
 *                   $ref: '#/definitions/Client'
 *                 status:
 *                   type: number
 *                   example: 200
 *       400:
 *         description: Bad request. Invalid input or missing fields.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid email format"
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
 *                 status:
 *                   type: number
 *                   example: 404

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

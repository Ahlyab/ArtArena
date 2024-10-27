/**
 * @swagger
 * tags:
 *   name: Artists
 *   description: CRUD operations for managing artists
 */

/**
 * @swagger
 * /api/artist/create_artist:
 *   post:
 *     summary: Create a new artist
 *     description: Create a new artist with the provided details.
 *     tags: [Artists]
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: artist
 *         description: Artist object that needs to be created
 *         required: true
 *         schema:
 *           type: object
 *           required:
 *             - email
 *             - password
 *             - firstName
 *             - lastName
 *             - user_type
 *           properties:
 *             email:
 *               type: string
 *               example: "artist@example.com"
 *             password:
 *               type: string
 *               example: "SecurePass123"
 *             firstName:
 *               type: string
 *               example: "John"
 *             lastName:
 *               type: string
 *               example: "Doe"
 *             user_type:
 *               type: string
 *               enum: ["artist", "client", "admin"]
 *               example: "artist"
 *     responses:
 *       201:
 *         description: Artist created successfully
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: "artist created successfully"
 *             artist:
 *               type: object
 *       400:
 *         description: Bad request (missing fields or invalid input)
 */

/**
 * @swagger
 * /api/artist/get_artists:
 *   get:
 *     summary: Get all artists
 *     description: Retrieve a list of all artists.
 *     tags: [Artists]
 *     responses:
 *       200:
 *         description: A list of artists
 *         schema:
 *           type: object
 *           properties:
 *             artists:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   email:
 *                     type: string
 *                   firstName:
 *                     type: string
 *                   lastName:
 *                     type: string
 *                   user_type:
 *                     type: string
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /api/artist/get_artist/{id}:
 *   get:
 *     summary: Get a single artist
 *     description: Retrieve details of a specific artist by ID.
 *     tags: [Artists]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: ID of the artist to retrieve
 *     responses:
 *       200:
 *         description: Artist details retrieved successfully
 *         schema:
 *           type: object
 *           properties:
 *             artist:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 email:
 *                   type: string
 *                 firstName:
 *                   type: string
 *                 lastName:
 *                   type: string
 *                 user_type:
 *                   type: string
 *       400:
 *         description: Artist not found or error occurred
 */

/**
 * @swagger
 * /api/artist/update_artist/{id}:
 *   put:
 *     summary: Update an artist
 *     description: Update the details of an artist by ID.
 *     tags: [Artists]
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: ID of the artist to update
 *       - in: body
 *         name: artist
 *         description: Updated artist details
 *         required: true
 *         schema:
 *           type: object
 *           required:
 *             - email
 *             - password
 *             - firstName
 *             - lastName
 *             - user_type
 *           properties:
 *             email:
 *               type: string
 *               example: "artist@example.com"
 *             password:
 *               type: string
 *               example: "NewSecurePass123"
 *             firstName:
 *               type: string
 *               example: "Jane"
 *             lastName:
 *               type: string
 *               example: "Smith"
 *             user_type:
 *               type: string
 *               enum: ["artist", "client", "admin"]
 *               example: "artist"
 *     responses:
 *       200:
 *         description: Artist updated successfully
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: "Artist updated successfully"
 *             artist:
 *               type: object
 *       400:
 *         description: Bad request or artist not found
 */

/**
 * @swagger
 * /api/artist/delete_artist/{id}:
 *   delete:
 *     summary: Delete an artist
 *     description: Delete an artist by ID.
 *     tags: [Artists]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: ID of the artist to delete
 *     responses:
 *       200:
 *         description: Artist deleted successfully
 *       400:
 *         description: Bad request or artist not found
 */

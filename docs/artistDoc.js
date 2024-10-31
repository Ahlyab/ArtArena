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
 *     tags: [Artists]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Artist's email
 *                 example: artist@example.com
 *               password:
 *                 type: string
 *                 description: Artist's password (must contain at least one uppercase letter, one lowercase letter, one number, and be 8 characters or longer)
 *                 example: Password123
 *               firstName:
 *                 type: string
 *                 description: Artist's first name
 *                 example: John
 *               lastName:
 *                 type: string
 *                 description: Artist's last name
 *                 example: Doe
 *               user_type:
 *                 type: string
 *                 description: User type (artist, client, or admin)
 *                 example: artist
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
 *         description: Artist created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: artist created successfully
 *                 artist:
 *                   $ref: '#/components/schemas/Artist'
 *       400:
 *         description: Bad request (Invalid input or missing required fields)
 */

/**
 * @swagger
 * /api/artist/update_artist/{id}:
 *   put:
 *     summary: Update an existing artist's information
 *     tags: [Artists]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Artist ID
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
 *                 description: User type (must be 'artist')
 *                 example: artist
 *               profilePhoto:
 *                 type: string
 *                 description: URL of profile photo
 *               arts:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Array of Art IDs associated with the artist
 *               soldArts:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Array of sold Art IDs associated with the artist
 *               totalRevenue:
 *                 type: number
 *                 description: Artist's total revenue
 *                 example: 5000
 *               address:
 *                 type: string
 *                 description: Artist's address
 *                 example: 123 Main Street
 *               clients:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Array of Client IDs associated with the artist
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
 *         description: Artist updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Artist updated successfully
 *                 artist:
 *                   $ref: '#/components/schemas/Artist'
 *       400:
 *         description: Bad request (Invalid input or missing required fields)
 *       404:
 *         description: Artist not found
 */

// /-------------------------------------/

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

/**
 * @swagger
 * /api/artist/get_nearby_artists:
 *   get:
 *     summary: Retrieve a list of nearby artists based on location
 *     tags: [Artists]
 *     parameters:
 *       - in: query
 *         name: longitude
 *         schema:
 *           type: number
 *         required: true
 *         description: Longitude of the location
 *         example: 103.851959
 *       - in: query
 *         name: latitude
 *         schema:
 *           type: number
 *         required: true
 *         description: Latitude of the location
 *         example: 1.290270
 *       - in: query
 *         name: maxDistance
 *         schema:
 *           type: integer
 *           description: Maximum distance in meters to search for artists (default is 10,000 meters)
 *           example: 5000
 *     responses:
 *       200:
 *         description: List of nearby artists within the specified distance
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 artists:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Artist'
 *                 status:
 *                   type: integer
 *                   example: 200
 *       500:
 *         description: Server error while fetching nearby artists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error fetching nearby artists
 */

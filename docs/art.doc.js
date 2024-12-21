/**
 * @swagger
 * tags:
 *   name: Art
 *   description: Art management operations
 */

/**
 * @swagger
 * /api/art/create_art:
 *   post:
 *     summary: Create a new art piece
 *     tags: [Art]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Starry Night"
 *               price:
 *                 type: number
 *                 example: 1500.99
 *               description:
 *                 type: string
 *                 example: "A beautiful representation of a starry night."
 *               type:
 *                 type: string
 *                 example: "Oil Painting"
 *               size:
 *                 type: string
 *                 example: "24x36"
 *               artist:
 *                 type: string
 *                 example: "Vincent van Gogh"
 *               image:
 *                 type: string
 *                 example: "http://example.com/images/starry_night.jpg"
 *             required:
 *               - title
 *               - price
 *               - description
 *               - type
 *               - size
 *               - artist
 *               - image
 *     responses:
 *       200:
 *         description: Art created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Art created successfully"
 *                 art:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "60d21b4667d0d8992e610c85"
 *                     title:
 *                       type: string
 *                       example: "Starry Night"
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /api/art/get_arts:
 *   get:
 *     summary: Retrieve all arts
 *     tags: [Art]
 *     responses:
 *       200:
 *         description: A list of arts
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 arts:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "60d21b4667d0d8992e610c85"
 *                       title:
 *                         type: string
 *                         example: "Starry Night"
 *                       price:
 *                         type: number
 *                         example: 1500.99
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /api/art/get_art/{id}:
 *   get:
 *     summary: Retrieve a specific art piece by ID
 *     tags: [Art]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the art piece
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Art retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 art:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "60d21b4667d0d8992e610c85"
 *                     title:
 *                       type: string
 *                       example: "Starry Night"
 *                     price:
 *                       type: number
 *                       example: 1500.99
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /api/art/get_arts_by_artist/{artistId}:
 *   get:
 *     summary: Retrieve arts by a specific artist
 *     tags: [Art]
 *     parameters:
 *       - name: artistId
 *         in: path
 *         required: true
 *         description: The ID of the artist
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Arts retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 arts:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "60d21b4667d0d8992e610c85"
 *                       title:
 *                         type: string
 *                         example: "Starry Night"
 *                       price:
 *                         type: number
 *                         example: 1500.99
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /api/art/get_recent_arts:
 *   get:
 *     summary: Retrieve the most recent arts
 *     tags: [Art]
 *     responses:
 *       200:
 *         description: Recent arts retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 arts:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "60d21b4667d0d8992e610c85"
 *                       title:
 *                         type: string
 *                         example: "Starry Night"
 *                       price:
 *                         type: number
 *                         example: 1500.99
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /api/art/update_art/{id}:
 *   put:
 *     summary: Update an existing art piece
 *     tags: [Art]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the art piece
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Starry Night Over Paris"
 *               price:
 *                 type: number
 *                 example: 2000.00
 *               description:
 *                 type: string
 *                 example: "An updated view of a starry night over Paris."
 *               type:
 *                 type: string
 *                 example: "Oil Painting"
 *               size:
 *                 type: string
 *                 example: "30x40"
 *               image:
 *                 type: string
 *                 example: "http://example.com/images/starry_night_paris.jpg"
 *             required: false
 *     responses:
 *       200:
 *         description: Art updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Art updated successfully"
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /api/art/delete_art/{id}:
 *   delete:
 *     summary: Delete an art piece by ID
 *     tags: [Art]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the art piece
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Art deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Art deleted successfully"
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /api/art/sell_art/{id}:
 *   post:
 *     summary: Mark an art piece as sold
 *     tags: [Art]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the art piece
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Art sold successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Art marked as sold successfully"
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /api/art/buy_art/{id}:
 *   post:
 *     summary: Mark an art piece as available for sale
 *     tags: [Art]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the art piece
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Art bought successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Art marked as available for sale successfully"
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /api/art/search:
 *   get:
 *     summary: Perform an advanced search on art pieces.
 *     description: Retrieve art pieces based on search parameters such as title, description, type, artist name, and sorting options, with pagination support.
 *     tags:
 *       - Art
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search term to match against the title or description of art pieces (case-insensitive).
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *         description: Filter art pieces by their type (e.g., "Painting", "Sculpture").
 *       - in: query
 *         name: artistname
 *         schema:
 *           type: string
 *         description: Search for art pieces by artist name (case-insensitive).
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: ["1", "-1"]
 *         description: Sort the results by created date. Use "1" for ascending and "-1" for descending order.
 *       - in: query
 *         name: startIndex
 *         schema:
 *           type: integer
 *           default: 0
 *         description: The index to start fetching results from (for pagination).
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: The maximum number of results to return (for pagination).
 *     responses:
 *       200:
 *         description: Successful response with the list of matching art pieces.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "64fd17e13a4f4a2c1d8b4567"
 *                       title:
 *                         type: string
 *                         example: "Starry Night"
 *                       price:
 *                         type: number
 *                         example: 5000
 *                       description:
 *                         type: string
 *                         example: "A beautiful painting by Vincent van Gogh."
 *                       type:
 *                         type: string
 *                         example: "Painting"
 *                       size:
 *                         type: string
 *                         example: "Medium"
 *                       artist:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                             example: "64fd17e13a4f4a2c1d8b1234"
 *                           name:
 *                             type: string
 *                             example: "Vincent van Gogh"
 *                       image:
 *                         type: string
 *                         example: "starry-night.jpg"
 *                       sold:
 *                         type: boolean
 *                         example: false
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-12-04T10:00:00Z"
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-12-04T10:00:00Z"
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: integer
 *                       example: 20
 *                     startIndex:
 *                       type: integer
 *                       example: 0
 *                     limit:
 *                       type: integer
 *                       example: 10
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Server error"
 */

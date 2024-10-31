/**
 * @swagger
 * components:
 *   schemas:
 *     Admin:
 *       type: object
 *       required:
 *         - email
 *         - password
 *         - firstName
 *         - lastName
 *         - user_type
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           example: "admin@example.com"
 *           description: Unique email of the admin
 *         password:
 *           type: string
 *           format: password
 *           example: "SecurePass123"
 *           description: Encrypted password of the admin
 *         firstName:
 *           type: string
 *           example: "John"
 *           description: First name of the admin
 *         lastName:
 *           type: string
 *           example: "Doe"
 *           description: Last name of the admin
 *         user_type:
 *           type: string
 *           example: "admin"
 *           description: Type of user, typically "admin"
 *         profilePhoto:
 *           type: string
 *           format: uri
 *           example: "https://example.com/profile.jpg"
 *           description: Profile photo URL for the admin
 */

/**
 * Registers a new admin with a unique email.
 * @async
 * @function signup
 * @memberof Admin
 * @param {string} email - Admin's unique email address
 * @param {string} password - Admin's password to be hashed
 * @param {string} firstName - Admin's first name
 * @param {string} lastName - Admin's last name
 * @param {string} user_type - User type, should be "admin"
 * @param {string} [profilePhoto] - URL of the admin's profile photo
 * @returns {Promise<object>} The created admin document
 * @throws {Error} Email already in use
 */

/**
 * Logs in an existing admin by email and password.
 * @async
 * @function login
 * @memberof Admin
 * @param {string} email - Admin's email address
 * @param {string} password - Admin's password
 * @returns {Promise<object>} The logged-in admin document
 * @throws {Error} Incorrect email or password
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Art:
 *       type: object
 *       required:
 *         - title
 *         - price
 *         - description
 *         - type
 *         - size
 *         - image
 *       properties:
 *         title:
 *           type: string
 *           example: "Starry Night"
 *           description: Title of the art piece
 *         price:
 *           type: number
 *           example: 500.00
 *           description: Price of the art piece
 *         description:
 *           type: string
 *           example: "A beautiful depiction of the night sky"
 *           description: Description of the art piece
 *         type:
 *           type: string
 *           example: "Painting"
 *           description: Type or category of the art
 *         size:
 *           type: string
 *           example: "24x36 inches"
 *           description: Dimensions or size of the art piece
 *         artist:
 *           type: string
 *           format: ObjectId
 *           example: "60d21b5467d0d8992e610c85"
 *           description: Reference to the artist's ID
 *         image:
 *           type: string
 *           format: uri
 *           example: "https://example.com/art-image.jpg"
 *           description: URL of the art image
 *         sold:
 *           type: boolean
 *           example: false
 *           description: Sale status of the art
 */

/**
 * Marks an art piece as sold.
 * @async
 * @function sell
 * @memberof Art
 * @param {string} artId - ID of the art to mark as sold
 * @returns {Promise<object>} Updated art document with sold status set to true
 */

/**
 * Marks an art piece as available (not sold).
 * @async
 * @function buy
 * @memberof Art
 * @param {string} artId - ID of the art to mark as available
 * @returns {Promise<object>} Updated art document with sold status set to false
 */

/**
 * Updates an existing art piece with new details.
 * @async
 * @function updateArt
 * @memberof Art
 * @param {string} artId - ID of the art to update
 * @param {string} title - Updated title of the art
 * @param {number} price - Updated price of the art
 * @param {string} description - Updated description of the art
 * @param {string} type - Updated type/category of the art
 * @param {string} size - Updated dimensions of the art
 * @param {string} image - Updated image URL of the art
 * @returns {Promise<object>} Updated art document
 */

/**
 * Deletes an art piece by ID.
 * @async
 * @function deleteArt
 * @memberof Art
 * @param {string} artId - ID of the art to delete
 * @returns {Promise<object>} Deleted art document
 */

/**
 * Adds a new art piece.
 * @async
 * @function addArt
 * @memberof Art
 * @param {string} title - Title of the new art piece
 * @param {number} price - Price of the new art piece
 * @param {string} description - Description of the new art piece
 * @param {string} type - Type/category of the new art
 * @param {string} size - Dimensions of the new art piece
 * @param {string} artist - ID of the artist creating the art
 * @param {string} image - URL of the image for the new art piece
 * @returns {Promise<object>} The created art document
 */

/**
 * Retrieves all art pieces.
 * @async
 * @function getArts
 * @memberof Art
 * @returns {Promise<Array<object>>} Array of all art documents
 */

/**
 * Retrieves all art pieces by a specific artist.
 * @async
 * @function getArtsByArtist
 * @memberof Art
 * @param {string} artistId - ID of the artist whose art pieces to retrieve
 * @returns {Promise<Array<object>>} Array of art documents created by the artist
 */

/**
 * Retrieves the most recent art pieces.
 * @async
 * @function getRecentArts
 * @memberof Art
 * @returns {Promise<Array<object>>} Array of the 8 most recent art documents
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Artist:
 *       type: object
 *       required:
 *         - email
 *         - password
 *         - firstName
 *         - lastName
 *         - user_type
 *         - location
 *       properties:
 *         email:
 *           type: string
 *           description: The unique email of the artist.
 *         password:
 *           type: string
 *           description: The hashed password of the artist.
 *         firstName:
 *           type: string
 *           description: The first name of the artist.
 *         lastName:
 *           type: string
 *           description: The last name of the artist.
 *         user_type:
 *           type: string
 *           description: The role type of the user (e.g., 'artist').
 *         profilePhoto:
 *           type: string
 *           description: The URL to the artist's profile photo.
 *           default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
 *         arts:
 *           type: array
 *           items:
 *             type: string
 *           description: List of IDs referencing the artist's artwork.
 *         soldArts:
 *           type: array
 *           items:
 *             type: string
 *           description: List of IDs referencing the artist's sold artwork.
 *         totalRevenue:
 *           type: number
 *           description: Total revenue generated by the artist.
 *           default: 0
 *         address:
 *           type: string
 *           description: Physical address of the artist.
 *         clients:
 *           type: array
 *           items:
 *             type: string
 *           description: List of IDs referencing the artist's clients.
 *         location:
 *           type: object
 *           properties:
 *             type:
 *               type: string
 *               enum: ["Point"]
 *               description: Type of GeoJSON object.
 *             coordinates:
 *               type: array
 *               items:
 *                 type: number
 *               description: Coordinates for the location [longitude, latitude].
 *       example:
 *         email: "artist@example.com"
 *         password: "hashedpassword"
 *         firstName: "John"
 *         lastName: "Doe"
 *         user_type: "artist"
 *         profilePhoto: "https://example.com/photo.jpg"
 *         arts: ["605c72e5d5f4ab0015af5c45", "605c72e5d5f4ab0015af5c46"]
 *         soldArts: ["605c72e5d5f4ab0015af5c47"]
 *         totalRevenue: 1500
 *         address: "123 Art Street"
 *         clients: ["605c72e5d5f4ab0015af5c48"]
 *         location:
 *           type: "Point"
 *           coordinates: [72.8777, 19.0760]
 */

/**
 * Registers a new artist by hashing their password and saving to the database.
 * @async
 * @function signup
 * @memberof Artist
 * @param {string} email - Unique email of the artist
 * @param {string} password - Password for the artist account
 * @param {string} firstName - First name of the artist
 * @param {string} lastName - Last name of the artist
 * @param {string} user_type - Type of user (e.g., "artist")
 * @returns {Promise<object>} The created artist document
 */

/**
 * Authenticates an artist by comparing the provided password with the stored hash.
 * @async
 * @function login
 * @memberof Artist
 * @param {string} email - Email of the artist
 * @param {string} password - Password for the artist account
 * @returns {Promise<object>} The authenticated artist document
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Client:
 *       type: object
 *       required:
 *         - email
 *         - password
 *         - firstName
 *         - lastName
 *         - user_type
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           example: "client@example.com"
 *           description: Unique email for the client
 *         password:
 *           type: string
 *           format: password
 *           description: Password for the client account
 *         firstName:
 *           type: string
 *           example: "Jane"
 *           description: First name of the client
 *         lastName:
 *           type: string
 *           example: "Doe"
 *           description: Last name of the client
 *         user_type:
 *           type: string
 *           example: "client"
 *           description: Type of the user (e.g., client)
 *         profilePhoto:
 *           type: string
 *           format: uri
 *           example: "https://example.com/profile.jpg"
 *           description: URL of the client's profile photo
 *         address:
 *           type: string
 *           example: "456 Client Road, Client City"
 *           description: Address of the client
 *         bought:
 *           type: array
 *           items:
 *             type: string
 *             format: ObjectId
 *           description: Array of ObjectId references to artworks purchased by the client
 *         spentAmount:
 *           type: number
 *           example: 500.00
 *           description: Total amount spent by the client on purchased artworks
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Client:
 *       type: object
 *       required:
 *         - email
 *         - password
 *         - firstName
 *         - lastName
 *         - user_type
 *         - location
 *       properties:
 *         email:
 *           type: string
 *           description: The unique email of the client.
 *         password:
 *           type: string
 *           description: The hashed password of the client.
 *         firstName:
 *           type: string
 *           description: The first name of the client.
 *         lastName:
 *           type: string
 *           description: The last name of the client.
 *         user_type:
 *           type: string
 *           description: The role type of the user (e.g., 'client').
 *         profilePhoto:
 *           type: string
 *           description: The URL to the client’s profile photo.
 *         address:
 *           type: string
 *           description: Physical address of the client.
 *         bought:
 *           type: array
 *           items:
 *             type: string
 *           description: List of IDs referencing the art pieces bought by the client.
 *         spentAmount:
 *           type: number
 *           description: Total amount spent by the client.
 *           default: 0
 *         location:
 *           type: object
 *           properties:
 *             type:
 *               type: string
 *               enum: ["Point"]
 *               description: Type of GeoJSON object.
 *             coordinates:
 *               type: array
 *               items:
 *                 type: number
 *               description: Coordinates for the location [longitude, latitude].
 *       example:
 *         email: "client@example.com"
 *         password: "hashedpassword"
 *         firstName: "Jane"
 *         lastName: "Doe"
 *         user_type: "client"
 *         profilePhoto: "https://example.com/photo.jpg"
 *         address: "456 Buyer Street"
 *         bought: ["605c72e5d5f4ab0015af5c49"]
 *         spentAmount: 1000
 *         location:
 *           type: "Point"
 *           coordinates: [72.8777, 19.0760]
 */

/**
 * Registers a new client by hashing their password and saving to the database.
 * @async
 * @function signup
 * @memberof Client
 * @param {string} email - Unique email of the client
 * @param {string} password - Password for the client account
 * @param {string} firstName - First name of the client
 * @param {string} lastName - Last name of the client
 * @param {string} user_type - Type of user (e.g., "client")
 * @returns {Promise<object>} The created client document
 */

/**
 * Authenticates a client by comparing the provided password with the stored hash.
 * @async
 * @function login
 * @memberof Client
 * @param {string} email - Email of the client
 * @param {string} password - Password for the client account
 * @returns {Promise<object>} The authenticated client document
 */

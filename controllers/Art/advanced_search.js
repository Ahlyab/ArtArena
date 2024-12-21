const Artist = require("../../models/artist.model");
const Art = require("../../models/art.model");


const getArtistIdsByName = async (name) => {
    const regex = new RegExp(name, "i"); // Case-insensitive regex
    const artists = await Artist.find({ firstName: regex }, "_id"); // Fetch only IDs
    return artists.map((artist) => artist._id);
};

module.exports.advancedSearch = async (req, res) => {
    try {
        const {
            search,
            type,
            artistname,
            sort,
            startIndex = 0,
            limit = 10,
        } = req.query;

        // Convert pagination parameters to numbers
        const start = parseInt(startIndex, 10) || 0;
        const pageLimit = parseInt(limit, 10) || 10;

        // Build the search query dynamically
        let query = {};

        // Search by title or description
        if (search) {
            const regex = new RegExp(search, "i"); // Case-insensitive regex
            query.$or = [{ title: regex }, { description: regex }];
        }

        // Filter by type
        if (type) {
            query.type = type;
        }

        // Filter by artist name
        if (artistname) {
            const artistIds = await getArtistIdsByName(artistname);
            if (artistIds.length > 0) {
                query.artist = { $in: artistIds };
            } else {
                // If no matching artist is found, return an empty result
                return res.status(200).json({
                    success: true,
                    data: [],
                    pagination: { total: 0, startIndex: start, limit: pageLimit },
                });
            }
        }

        // Sort order
        const sortOrder = sort === "1" ? 1 : -1; // 1 for ascending, -1 for descending
        const sortField = "createdAt"; // Sort by createdAt

        // Fetch arts with pagination
        const arts = await Art.find(query)
            .populate("artist") // Populate artist's name
            .sort({ [sortField]: sortOrder })
            .skip(start)
            .limit(pageLimit);

        // Total count of matching documents
        const total = await Art.countDocuments(query);

        // Response
        res.status(200).json({
            success: true,
            data: arts,
            pagination: {
                total,
                startIndex: start,
                limit: pageLimit,
            },
        });
    } catch (error) {
        console.error("Error during advanced search:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

const Artist = require("../../models/artist.model");


module.exports.getNearbyArtist = async (req, res) => {
    const { longitude, latitude, maxDistance = 90000 } = req.query; // Default to 10km
    console.log(longitude, latitude, maxDistance);

    try {
        // Validate input for safety (optional)
        if (!longitude || !latitude) {
            return res.status(400).json({ error: "Missing longitude or latitude" });
        }

        const artists = await Artist.find({
            location: {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [parseFloat(longitude), parseFloat(latitude)],
                    },
                    // $maxDistance: parseInt(maxDistance, 10) || 20000, // 90km by default
                },
            },
        }).limit(10);

        res.status(200).json({ artists, status: 200 });
    } catch (error) {
        console.error(error); // Log the actual error for debugging
        res.status(500).json({ error: "Error fetching nearby artists" });
    }
};

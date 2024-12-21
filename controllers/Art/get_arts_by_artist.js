const Art = require("../../models/art.model");


module.exports.get_arts_by_artist = async (req, res) => {
    const { artistId } = req.params;

    if (!artistId) {
        return res
            .status(400)
            .json({ message: "Artist id is required", status: 400 });
    }

    try {
        const arts = await Art.getArtsByArtist(artistId);
        return res.status(200).json({ arts, status: 200 });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: error.message, status: 400 });
    }
};

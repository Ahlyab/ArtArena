const Artist = require("../../models/artist.model");


module.exports.get_artist = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: "Id is required", status: 400 });
    }

    try {
        const artist = await Artist.findById(id).populate("arts");
        if (!artist) {
            return res.status(404).json({ message: "Artist not found", status: 404 });
        }
        return res.status(200).json({ artist: artist, status: 200 });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: error.message, status: 400 });
    }
};

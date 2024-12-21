const Artist = require("../../models/artist.model");


module.exports.get_artists = async (req, res) => {
    try {
        const artists = await Artist.find().populate("arts");
        return res.status(200).json({ artists, status: 200 });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: error.message, status: 400 });
    }
};

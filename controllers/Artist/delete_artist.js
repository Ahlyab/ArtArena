const Artist = require("../../models/artist.model");


module.exports.delete_artist = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: "Id is required", status: 400 });
    }

    try {
        await Artist.findByIdAndDelete(id);
        return res
            .status(200)
            .json({ message: "Artist deleted successfully", status: 200 });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: error.message, status: 400 });
    }
};

const Art = require("../../models/art.model");


module.exports.get_art = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: "Id is required", status: 400 });
    }

    try {
        const art = await Art.findById(id)?.populate("artist");
        if (!art) {
            return res.status(404).json({ message: "Art not found", status: 404 });
        }
        return res.status(200).json({ art, status: 200 });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: error.message, status: 400 });
    }
};

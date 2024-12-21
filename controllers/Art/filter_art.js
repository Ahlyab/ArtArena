const Art = require("../../models/art.model");


module.exports.filter_art = async (req, res) => {
    const { type } = req.query;

    if (!type) {
        return res.status(400).json({ message: "Type is required", status: 400 });
    }

    try {
        const arts = await Art.find({ type });
        return res.status(200).json({ arts, status: 200 });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: error.message, status: 400 });
    }
};

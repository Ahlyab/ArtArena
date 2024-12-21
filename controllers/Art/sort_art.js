const Art = require("../../models/art.model");


module.exports.sort_art = async (req, res) => {
    const { sort } = req.query;

    if (!sort) {
        return res.status(400).json({ message: "Sort is required", status: 400 });
    }

    try {
        const arts = await Art.find().sort({ price: sort });
        return res.status(200).json({ arts, status: 200 });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: error.message, status: 400 });
    }
};

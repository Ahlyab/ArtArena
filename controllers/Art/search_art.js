const Art = require("../../models/art.model");


module.exports.search_art = async (req, res) => {
    const { query } = req.query;

    if (!query) {
        return res.status(400).json({ message: "Query is required", status: 400 });
    }

    try {
        const arts = await Art.find({ title: { $regex: query, $options: "i" } });
        return res.status(200).json({ arts, status: 200 });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: error.message, status: 400 });
    }
};

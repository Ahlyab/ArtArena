const Art = require("../../models/art.model");

module.exports.paginate_art = async (req, res) => {
    const { page, limit } = req.query;

    if (!page || !limit) {
        return res
            .status(400)
            .json({ message: "Page and limit are required", status: 400 });
    }

    try {
        const arts = await Art.find()
            .skip((page - 1) * limit)
            .limit(limit);
        return res.status(200).json({ arts, status: 200 });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: error.message, status: 400 });
    }
};

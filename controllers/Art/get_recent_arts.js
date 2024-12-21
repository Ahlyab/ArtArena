const Art = require("../../models/art.model");


module.exports.get_recent_arts = async (req, res) => {
    try {
        const arts = await Art.getRecentArts();
        return res.status(200).json({ arts, status: 200 });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: error.message, status: 400 });
    }
};

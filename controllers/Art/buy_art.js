const Art = require("../../models/art.model");


module.exports.buy_art = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: "Id is required", status: 400 });
    }

    try {
        await Art.buy(id);
        return res
            .status(200)
            .json({ message: "Art bought successfully", status: 200 });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: error.message, status: 400 });
    }
};

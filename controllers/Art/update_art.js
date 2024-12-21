const Art = require("../../models/art.model");


module.exports.update_art = async (req, res) => {
    const { id } = req.params;
    const { title, price, description, type, size, artist, image, sold } =
        req.body;

    if (!id) {
        return res.status(400).json({ message: "Id is required", status: 400 });
    }

    const updateData = {};
    if (title !== undefined) updateData.title = title;
    if (price !== undefined) updateData.price = price;
    if (description !== undefined) updateData.description = description;
    if (type !== undefined) updateData.type = type;
    if (size !== undefined) updateData.size = size;
    if (artist !== undefined) updateData.artist = artist;
    if (image !== undefined) updateData.image = image;
    if (sold !== undefined) updateData.sold = sold;

    try {
        const updatedArt = await Art.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true,
        });

        if (!updatedArt) {
            return res.status(404).json({ message: "Art not found", status: 404 });
        }
        return res
            .status(200)
            .json({ message: "Art updated successfully", updatedArt, status: 200 });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: error.message, status: 400 });
    }
};

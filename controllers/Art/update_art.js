const Art = require("../../models/art.model");

module.exports.update_art = async (req, res) => {
  const { id } = req.params;
  const {
    title,
    price,
    description,
    type,
    size,
    artist,
    image,
    sold,
    isAuction,
    startingBid,
    auctionEndTime,
  } = req.body;
  console.log("req comming : ", req.body);
  

  if (!id) {
    return res.status(400).json({ message: "Art Id is required", status: 400 });
  }

  try {
    // Fetch existing art to check current state
    const existingArt = await Art.findById(id);
    if (!existingArt) {
      return res.status(404).json({ message: "Art not found", status: 404 });
    }

    const updateData = { title, description, type, size, artist, image, sold };

    // Handle transition between Fixed Price & Auction modes
    if (isAuction) {
      // ✅ Changing to Auction: Remove price, require auction details
      updateData.isAuction = true;
      updateData.price = null;
      if (!startingBid || !auctionEndTime) {
        return res.status(400).json({
          message: "Starting bid and auction end time are required for auction mode",
          status: 400,
        });
      }
      updateData.startingBid = startingBid;
      updateData.auctionEndTime = new Date(auctionEndTime);
    } else {
      // ✅ Changing to Fixed Price: Remove auction details, require price
      updateData.isAuction = false;
      updateData.startingBid = null;
      updateData.auctionEndTime = null;
      if (!price) {
        return res.status(400).json({
          message: "Price is required when not in auction mode",
          status: 400,
        });
      }
      updateData.price = price;
    }

    // Update the artwork in the database
    const updatedArt = await Art.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    return res.status(200).json({
      message: "Art updated successfully",
      updatedArt,
      status: 200,
    });

  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message, status: 400 });
  }
};

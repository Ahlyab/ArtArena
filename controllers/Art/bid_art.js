const ArtModel = require("../../models/art.model");

module.exports.bid_art = async (req, res) => {
  console.log("bid_art :", req.body);

  try {
    const { clientId, amount } = req.body;
    const { artId } = req.params;

    // Fetch the artwork
    const art = await ArtModel.findById(artId);
    if (!art) {
      return res.status(404).json({ message: "Artwork not found.", status: 404 });
    }

    // Check if the artwork is an auction
    if (!art.isAuction) {
      return res.status(400).json({ message: "This artwork is not up for auction.", status: 400 });
    }

    // Check if the artwork is already sold
    if (art.sold) {
      return res.status(400).json({ message: "This artwork is already sold.", status: 400 });
    }

    // Check if auction time has ended
    if (art.auctionEndTime && new Date() > art.auctionEndTime) {
      return res.status(400).json({ message: "Bidding time has ended.", status: 400 });
    }

    // Ensure the bid is higher than the current highest bid
    if (amount <= art.highestBid) {
      return res.status(400).json({ message: "Bid must be higher than the current highest bid.", status: 400 });
    }

    // Add the bid to the bids array
    art.bids.push({ client: clientId, amount });
    art.highestBid = amount;
    art.highestBidder = clientId;

    // Save the updated art
    const updatedArt = await art.save();

    return res.status(200).json({
      message: "Bid placed successfully!",
      status: 200,
      art: updatedArt,
    });

  } catch (error) {
    console.error("Error placing bid:", error);
    return res.status(500).json({ message: "Internal Server Error", status: 500 });
  }
};

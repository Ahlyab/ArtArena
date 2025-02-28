const Art = require("../../models/art.model");
const Artist = require("../../models/artist.model");
const Client = require("../../models/client.model");

module.exports.close_auction = async (req, res) => {
  const { artId } = req.params;

  try {
    const art = await Art.findById(artId).populate("highestBidder");

    if (!art) {
      return res.status(404).json({ message: "Artwork not found.", status: 404 });
    }
    if (!art.isAuction) {
      return res.status(400).json({ message: "This artwork is not an auction.", status: 400 });
    }
    if (!art.highestBidder) {
      return res.status(400).json({ message: "No bids were placed. Cannot close auction.", status: 400 });
    }

    // Mark as sold
    art.sold = true;

    // Add the sold artwork to the artist's sold list
    await Artist.findByIdAndUpdate(art.artist, {
      $push: { soldArts: artId },
    });

    // Add the bought artwork to the highest bidder's bought list
    await Client.findByIdAndUpdate(art.highestBidder, {
      $push: { bought: artId },
    });

    await art.save();

    return res.status(200).json({
      message: "Auction closed successfully!",
      status: 200,
      art,
    });
  } catch (error) {
    console.error("Error closing auction:", error);
    return res.status(500).json({ message: "Internal Server Error", status: 500 });
  }
};

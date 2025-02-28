const cron = require("node-cron");
const Art = require("../../models/art.model");
const Artist = require("../../models/artist.model");
const Client = require("../../models/client.model");

const closeExpiredAuctions = async () => {
  try {
    const now = new Date();

    // Find all auctions that have expired and are still open
    const expiredAuctions = await Art.find({
      isAuction: true,
      sold: false,
      auctionEndTime: { $lte: now }, // End time has passed
    }).populate("highestBidder");

    for (let art of expiredAuctions) {
      if (!art.highestBidder) {
        console.log(`Auction for ${art.title} ended with no bids.`);
        continue; // Skip closing if no bids
      }

      // Mark artwork as sold
      art.sold = true;
      await art.save();

      // Update artist's sold list
      await Artist.findByIdAndUpdate(art.artist, {
        $push: { soldArts: art._id },
      });

      // Update highest bidder's bought list
      await Client.findByIdAndUpdate(art.highestBidder, {
        $push: { bought: art._id },
      });

      console.log(`Auction for ${art.title} closed automatically.`);
    }
  } catch (error) {
    console.error("Error closing expired auctions:", error);
  }
};

// Schedule job to run every minute
cron.schedule("* * * * *", closeExpiredAuctions, {
  scheduled: true,
  timezone: "UTC",
});

module.exports = closeExpiredAuctions;

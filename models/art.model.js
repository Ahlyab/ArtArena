const mongoose = require("mongoose");

const ArtSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    price: { type: Number },
    description: { type: String, required: true },
    type: { type: String, required: true },
    size: { type: String, required: true },
    artist: { type: mongoose.Schema.Types.ObjectId, ref: "Artist" },
    image: { type: String, required: true },
    sold: { type: Boolean, default: false },
    isAuction: { type: Boolean, default: false },
    startingBid: {
      type: Number,
      required: function () {
        return this.isAuction;
      },
    },
    bids: [
      {
        client: { type: mongoose.Schema.Types.ObjectId, ref: "Client" },
        amount: { type: Number, required: true },
        bidTime: { type: Date, default: Date.now },
      },
    ],
    highestBid: { type: Number, default: 0 },
    highestBidder: { type: mongoose.Schema.Types.ObjectId, ref: "Client" },
    auctionEndTime: { type: Date },
  },
  { timestamps: true }
);

// Mark an art as sold
ArtSchema.statics.sell = async function (artId) {
  return await this.findByIdAndUpdate(
    artId,
    { sold: true },
    { new: true }
  ).populate("artist");
};

// Mark an art as unsold
ArtSchema.statics.buy = async function (artId) {
  return await this.findByIdAndUpdate(
    artId,
    { sold: false },
    { new: true }
  ).populate("artist");
};

// Update art details
ArtSchema.statics.updateArt = async function (
  artId,
  title,
  price,
  description,
  type,
  size,
  image
) {
  return await this.findByIdAndUpdate(
    artId,
    { title, price, description, type, size, image },
    { new: true }
  ).populate("artist");
};

// Delete an art piece
ArtSchema.statics.deleteArt = async function (artId) {
  return await this.findByIdAndDelete(artId);
};

// Add a new art piece
ArtSchema.statics.addArt = async function (artData) {
  return await this.create(artData);
};

// Retrieve all art pieces with artist details populated
ArtSchema.statics.getArts = async function () {
  return await this.find().populate("artist");
};

// Retrieve all art pieces by a specific artist
ArtSchema.statics.getArtsByArtist = async function (artistId) {
  return await this.find({ artist: artistId }).populate("artist");
};

// Retrieve recent art pieces sorted by newest first
ArtSchema.statics.getRecentArts = async function () {
  return await this.find().populate("artist").sort({ _id: -1 }).limit(8);
};

const ArtModel = mongoose.model("Art", ArtSchema);

module.exports = ArtModel;

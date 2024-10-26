// Art : title, price, description, type, size, artist, image, sold

const mongoose = require("mongoose");

const ArtSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  artist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Artist",
  },
  image: {
    type: String,
    required: true,
  },
  sold: {
    type: Boolean,
    default: false,
  },
});

ArtSchema.statics.sell = async function (artId) {
  return await this.findByIdAndUpdate(artId, { sold: true });
};

ArtSchema.statics.buy = async function (artId) {
  return await this.findByIdAndUpdate(artId, { sold: false });
};

// add a method to the schema to update the art
ArtSchema.statics.updateArt = async function (
  artId,
  title,
  price,
  description,
  type,
  size,
  image
) {
  return await this.findByIdAndUpdate(artId, {
    title,
    price,
    description,
    type,
    size,
    image,
  });
};

// add a method to the schema to delete the art
ArtSchema.statics.deleteArt = async function (artId) {
  return await this.findByIdAndDelete(artId);
};

// add a method to the schema to add a new art
ArtSchema.statics.addArt = async function (
  title,
  price,
  description,
  type,
  size,
  artist,
  image
) {
  return await this.create({
    title,
    price,
    description,
    type,
    size,
    artist,
    image,
  });
};

// add a method to the schema to get all arts
ArtSchema.statics.getArts = async function () {
  return await this.find();
};

// add a method to the schema to get all arts by artist
ArtSchema.statics.getArtsByArtist = async function (artistId) {
  return await this.find({ artist: artistId });
};

// add a method to the schema to get all arts by recent
ArtSchema.statics.getRecentArts = async function () {
  return await this.find().sort({ _id: -1 }).limit(8);
};

const Art = mongoose.model("Art", ArtSchema);

module.exports = Art;

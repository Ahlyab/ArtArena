/**
 * // Art : title, price, description, type, size, artist, image, sold

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

define crud operations for Art
 */

const Art = require("../Model/Art");

module.exports.create_art = async (req, res) => {
  const { title, price, description, type, size, artist, image } = req.body;

  if (!title || !price || !description || !type || !size || !artist || !image) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const art = await Art.addArt(
      title,
      price,
      description,
      type,
      size,
      artist,
      image
    );
    return res
      .status(200)
      .json({ message: "Art created successfully", art, status: 200 });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};

module.exports.get_arts = async (req, res) => {
  try {
    const arts = await Art.getArts();
    return res.status(200).json({ arts, status: 200 });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};

module.exports.get_arts_by_artist = async (req, res) => {
  const { artistId } = req.params;

  if (!artistId) {
    return res.status(400).json({ message: "Artist id is required" });
  }

  try {
    const arts = await Art.getArtsByArtist(artistId);
    return res.status(200).json({ arts, status: 200 });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};

module.exports.get_recent_arts = async (req, res) => {
  try {
    const arts = await Art.getRecentArts();
    return res.status(200).json({ arts, status: 200 });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};

module.exports.get_art = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "Id is required" });
  }

  try {
    const art = await Art.findById(id);
    if (!art) {
      return res.status(400).json({ message: "Art not found" });
    }
    return res.status(200).json({ art, status: 200 });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message, status: 400 });
  }
};

module.exports.update_art = async (req, res) => {
  const { id } = req.params;
  const {
    title,
    price,
    description,
    type,
    size,
    artist, // Non-mandatory
    image,
    sold, // Non-mandatory
  } = req.body;

  if (!id) {
    return res.status(400).json({ message: "Id is required" });
  }

  // Initialize an empty object to hold the updates
  const updateData = {};

  // Check each field and add it to the updateData object if it's provided
  if (title !== undefined) {
    updateData.title = title;
  }
  if (price !== undefined) {
    updateData.price = price;
  }
  if (description !== undefined) {
    updateData.description = description;
  }
  if (type !== undefined) {
    updateData.type = type;
  }
  if (size !== undefined) {
    updateData.size = size;
  }
  if (artist !== undefined) {
    // Handle non-mandatory artist field
    updateData.artist = artist;
  }
  if (image !== undefined) {
    updateData.image = image;
  }
  if (sold !== undefined) {
    // Handle non-mandatory sold field
    updateData.sold = sold;
  }

  try {
    const updatedArt = await Art.findByIdAndUpdate(id, updateData, {
      new: true, // Return the updated document
      runValidators: true, // Ensure validation on update
    });

    if (!updatedArt) {
      return res.status(404).json({ message: "Art not found" });
    }
    return res
      .status(200)
      .json({ message: "Art updated successfully", updatedArt, status: 200 });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};

module.exports.delete_art = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "Id is required" });
  }

  try {
    await Art.deleteArt(id);
    return res.status(200).json({ message: "Art deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};

module.exports.sell_art = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "Id is required" });
  }

  try {
    await Art.sell(id);
    return res.status(200).json({ message: "Art sold successfully" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};

module.exports.buy_art = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "Id is required" });
  }

  try {
    await Art.buy(id);
    return res.status(200).json({ message: "Art bought successfully" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};

module.exports.search_art = async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ message: "Query is required" });
  }

  try {
    const arts = await Art.find({ title: { $regex: query, $options: "i" } });
    return res.status(200).json({ arts, status: 200 });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};

module.exports.filter_art = async (req, res) => {
  const { type } = req.query;

  if (!type) {
    return res.status(400).json({ message: "Type is required" });
  }

  try {
    const arts = await Art.find({ type });
    return res.status(200).json({ arts, status: 200 });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};

module.exports.sort_art = async (req, res) => {
  const { sort } = req.query;

  if (!sort) {
    return res.status(400).json({ message: "Sort is required" });
  }

  try {
    const arts = await Art.find().sort({ price: sort });
    return res.status(200).json({ arts, status: 200 });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};

module.exports.paginate_art = async (req, res) => {
  const { page, limit } = req.query;

  if (!page || !limit) {
    return res.status(400).json({ message: "Page and limit are required" });
  }

  try {
    const arts = await Art.find()
      .skip((page - 1) * limit)
      .limit(limit);
    return res.status(200).json({ arts, status: 200 });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};

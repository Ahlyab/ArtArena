const Art = require("../Model/Art");
const Artist = require("../Model/Artist");

module.exports.create_art = async (req, res) => {
  const { title, price, description, type, size, artist, image } = req.body;

  if (!title || !price || !description || !type || !size || !artist || !image) {
    return res
      .status(400)
      .json({ message: "All fields are required", status: 400 });
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
    // add art to array of art in artist
    await Artist.addArt(art._id, artist);
    return res
      .status(200)
      .json({ message: "Art created successfully", art, status: 200 });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message, status: 400 });
  }
};

module.exports.get_arts = async (req, res) => {
  try {
    const arts = await Art.getArts();
    return res.status(200).json({ arts, status: 200 });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message, status: 400 });
  }
};

module.exports.get_arts_by_artist = async (req, res) => {
  const { artistId } = req.params;

  if (!artistId) {
    return res
      .status(400)
      .json({ message: "Artist id is required", status: 400 });
  }

  try {
    const arts = await Art.getArtsByArtist(artistId);
    return res.status(200).json({ arts, status: 200 });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message, status: 400 });
  }
};

module.exports.get_recent_arts = async (req, res) => {
  try {
    const arts = await Art.getRecentArts();
    return res.status(200).json({ arts, status: 200 });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message, status: 400 });
  }
};

module.exports.get_art = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "Id is required", status: 400 });
  }

  try {
    const art = await Art.findById(id)?.populate("artist");
    if (!art) {
      return res.status(404).json({ message: "Art not found", status: 404 });
    }
    return res.status(200).json({ art, status: 200 });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message, status: 400 });
  }
};

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

module.exports.delete_art = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "Id is required", status: 400 });
  }

  try {
    await Art.deleteArt(id);
    return res
      .status(200)
      .json({ message: "Art deleted successfully", status: 200 });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message, status: 400 });
  }
};

module.exports.sell_art = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "Id is required", status: 400 });
  }

  try {
    await Art.sell(id);
    return res
      .status(200)
      .json({ message: "Art sold successfully", status: 200 });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message, status: 400 });
  }
};

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

module.exports.search_art = async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ message: "Query is required", status: 400 });
  }

  try {
    const arts = await Art.find({ title: { $regex: query, $options: "i" } });
    return res.status(200).json({ arts, status: 200 });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message, status: 400 });
  }
};

module.exports.filter_art = async (req, res) => {
  const { type } = req.query;

  if (!type) {
    return res.status(400).json({ message: "Type is required", status: 400 });
  }

  try {
    const arts = await Art.find({ type });
    return res.status(200).json({ arts, status: 200 });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message, status: 400 });
  }
};

module.exports.sort_art = async (req, res) => {
  const { sort } = req.query;

  if (!sort) {
    return res.status(400).json({ message: "Sort is required", status: 400 });
  }

  try {
    const arts = await Art.find().sort({ price: sort });
    return res.status(200).json({ arts, status: 200 });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message, status: 400 });
  }
};

module.exports.paginate_art = async (req, res) => {
  const { page, limit } = req.query;

  if (!page || !limit) {
    return res
      .status(400)
      .json({ message: "Page and limit are required", status: 400 });
  }

  try {
    const arts = await Art.find()
      .skip((page - 1) * limit)
      .limit(limit);
    return res.status(200).json({ arts, status: 200 });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message, status: 400 });
  }
};

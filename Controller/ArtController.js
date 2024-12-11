const Art = require("../Model/Art");
const Artist = require("../Model/Artist");
const Notification = require("../Model/Notification");
const Client = require("../Model/Client");
const createSocketInstance = require("../socket");
module.exports.create_art = async (req, res) => {
  const { title, price, description, type, size, artist, image } = req.body;
  const io = createSocketInstance();
  console.log("req comming");

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
    // notify all clients
    const clients = await Client.find();
    // get Artist name and avatar using artistid
    const artistDetails = await Artist.findById(artist);
    console.log("clients : ", clients);
    const message = `New art ${title} has been added`;
    const notifications = clients.map((client) => {
      return {
        message,
        recipient: client._id,
        read: false,
        art_title: title,
        art_id: art._id,
        sender_id: artist,
        avatar: artistDetails.profilePhoto,
        artist_name: artistDetails.firstName + " " + artistDetails.lastName,
      };
    });

    const response = await Notification.insertMany(notifications);

    console.log("Response", response);

    notifications.forEach((notification) => {
      const clientResponse = response.filter(
        (noti) =>
          noti.recipient.toString() === notification.recipient.toString()
      );
      io.to(notification.recipient.toString()).emit(
        "notification",
        clientResponse
      );
    });

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

// search controller with filter to search by art type, artist name, title, and price

module.exports.search_art_filter = async (req, res) => {
  const { query, type, artist, title } = req.query;

  if (!query) {
    return res.status(400).json({ message: "Query is required", status: 400 });
  }

  try {
    const arts = await Art.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { type: { $regex: query, $options: "i" } },
        { artist: { $regex: query, $options: "i" } },
      ],
    });
    return res.status(200).json({ arts, status: 200 });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message, status: 400 });
  }
};

// Helper function to get artist IDs by name
const getArtistIdsByName = async (name) => {
  const regex = new RegExp(name, "i"); // Case-insensitive regex
  const artists = await Artist.find({ firstName: regex }, "_id"); // Fetch only IDs
  return artists.map((artist) => artist._id);
};

module.exports.advancedSearch = async (req, res) => {
  try {
    const {
      search,
      type,
      artistname,
      sort,
      startIndex = 0,
      limit = 10,
    } = req.query;

    // Convert pagination parameters to numbers
    const start = parseInt(startIndex, 10) || 0;
    const pageLimit = parseInt(limit, 10) || 10;

    // Build the search query dynamically
    let query = {};

    // Search by title or description
    if (search) {
      const regex = new RegExp(search, "i"); // Case-insensitive regex
      query.$or = [{ title: regex }, { description: regex }];
    }

    // Filter by type
    if (type) {
      query.type = type;
    }

    // Filter by artist name
    if (artistname) {
      const artistIds = await getArtistIdsByName(artistname);
      if (artistIds.length > 0) {
        query.artist = { $in: artistIds };
      } else {
        // If no matching artist is found, return an empty result
        return res.status(200).json({
          success: true,
          data: [],
          pagination: { total: 0, startIndex: start, limit: pageLimit },
        });
      }
    }

    // Sort order
    const sortOrder = sort === "1" ? 1 : -1; // 1 for ascending, -1 for descending
    const sortField = "createdAt"; // Sort by createdAt

    // Fetch arts with pagination
    const arts = await Art.find(query)
      .populate("artist") // Populate artist's name
      .sort({ [sortField]: sortOrder })
      .skip(start)
      .limit(pageLimit);

    // Total count of matching documents
    const total = await Art.countDocuments(query);

    // Response
    res.status(200).json({
      success: true,
      data: arts,
      pagination: {
        total,
        startIndex: start,
        limit: pageLimit,
      },
    });
  } catch (error) {
    console.error("Error during advanced search:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

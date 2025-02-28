const createSocketInstance = require("../../socket/socket");
const Art = require("../../models/art.model");
const Artist = require("../../models/artist.model");
const Client = require("../../models/client.model");
const Notification = require("../../models/notification.model");

module.exports.create_art = async (req, res) => {
  const {
    title,
    price,
    description,
    type,
    size,
    artist,
    image,
    isAuction,
    startingBid,
    auctionEndTime,
  } = req.body;

  const io = createSocketInstance();

  // Validate required fields
  if (
    !title ||
    !description ||
    !type ||
    !size ||
    !artist ||
    !image ||
    (isAuction && (!startingBid || !auctionEndTime)) ||
    (!isAuction && !price)
  ) {
    return res.status(400).json({
      message: "All fields are required",
      status: 400,
    });
  }

  try {
    // Prepare the artwork data
    const artworkData = {
      title,
      price: isAuction ? null : Number(price),
      description,
      type,
      size,
      artist,
      image,
      isAuction,
      startingBid: isAuction ? Number(startingBid) : null,
      auctionEndTime: isAuction ? new Date(auctionEndTime) : null,
    };

    // Create the artwork
    const art = await Art.addArt(artworkData);

    // Add art to the artist's arts array
    await Artist.addArt(art._id, artist);

    // Notify all clients
    const clients = await Client.find();
    const artistDetails = await Artist.findById(artist);

    const message = `New art ${title} has been added`;
    const notifications = clients.map((client) => ({
      message,
      recipient: client._id,
      read: false,
      art_title: title,
      art_id: art._id,
      sender_id: artist,
      avatar: artistDetails.profilePhoto,
      artist_name: `${artistDetails.firstName} ${artistDetails.lastName}`,
    }));

    const response = await Notification.insertMany(notifications);

    notifications.forEach((notification) => {
      const clientResponse = response.find(
        (noti) =>
          noti.recipient.toString() === notification.recipient.toString()
      );
      io.to(notification.recipient.toString()).emit(
        "notification",
        clientResponse
      );
    });

    return res.status(200).json({
      message: "Art created successfully",
      art,
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message, status: 400 });
  }
};
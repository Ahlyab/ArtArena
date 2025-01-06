const createSocketInstance = require("../../socket/socket");
const Art = require("../../models/art.model");
const Artist = require("../../models/artist.model");
const Client = require("../../models/client.model");
const Notification = require("../../models/notification.model");

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
    console.log("artistDetails : ", artistDetails);
    // console.log("clients : ", clients);
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

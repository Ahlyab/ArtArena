const bcrypt = require("bcrypt");
const Artist = require("../../models/artist.model");

module.exports.update_artist = async (req, res) => {
  const { id } = req.params;
  const {
    email,
    password,
    firstName,
    lastName,
    user_type,
    profilePhoto,
    arts,
    soldArts,
    totalRevenue,
    address,
    clients,
    location,
    availableFrom,
    availableTo,
  } = req.body;

  if (!id) {
    return res.status(400).json({ message: "Id is required", status: 400 });
  }

  const updateFields = {};
  if (email) {
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Email is invalid", status: 400 });
    }
    updateFields.email = email;
  }
  if (password) {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({ message: "Password is weak", status: 400 });
    }

    const salt = await bcrypt.genSalt(12);
    const hash = await bcrypt.hash(password, salt);
    updateFields.password = hash;
  }
  if (firstName) updateFields.firstName = firstName;
  if (lastName) updateFields.lastName = lastName;
  if (user_type) {
    if (user_type !== "artist") {
      return res
        .status(400)
        .json({ message: "User type is invalid", status: 400 });
    }
    updateFields.user_type = user_type;
  }
  if (profilePhoto) updateFields.profilePhoto = profilePhoto;
  if (arts) updateFields.arts = arts;
  if (soldArts) updateFields.soldArts = soldArts;
  if (totalRevenue) updateFields.totalRevenue = totalRevenue;
  if (address) updateFields.address = address;
  if (clients) updateFields.clients = clients;
  if (location) updateFields.location = location;
  if (availableFrom) updateFields.availableFrom = availableFrom;
  if (availableTo) updateFields.availableTo = availableTo;

  try {
    const artist = await Artist.findByIdAndUpdate(id, updateFields, {
      new: true,
    })
      .populate("arts")
      .populate("clients");

    if (!artist) {
      return res.status(404).json({ message: "Artist not found", status: 404 });
    }
    artist.password = undefined;

    return res.status(200).json({
      message: "Artist updated successfully",
      artist: artist,
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message, status: 400 });
  }
};

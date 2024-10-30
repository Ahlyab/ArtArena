const Artist = require("../Model/Artist");
const bcrypt = require("bcrypt");

module.exports.create_artist = async (req, res) => {
  const { email, password, firstName, lastName, user_type } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required", status: 400 });
  }

  if (!password) {
    return res
      .status(400)
      .json({ message: "Password is required", status: 400 });
  }

  if (!firstName) {
    return res
      .status(400)
      .json({ message: "First name is required", status: 400 });
  }

  if (!lastName) {
    return res
      .status(400)
      .json({ message: "Last name is required", status: 400 });
  }

  if (!user_type) {
    return res
      .status(400)
      .json({ message: "User type is required", status: 400 });
  }

  const emailRegex = /\S+@\S+\.\S+/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Email is invalid", status: 400 });
  }

  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
  if (!passwordRegex.test(password)) {
    return res.status(400).json({ message: "Password is weak", status: 400 });
  }

  if (
    user_type !== "artist" &&
    user_type !== "client" &&
    user_type !== "admin"
  ) {
    return res
      .status(400)
      .json({ message: "User type is invalid", status: 400 });
  }

  try {
    const artist = await Artist.signup(
      email,
      password,
      firstName,
      lastName,
      user_type
    );

    return res.status(201).json({
      message: `${user_type} created successfully`,
      artist,
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message, status: 400 });
  }
};

module.exports.get_artists = async (req, res) => {
  try {
    const artists = await Artist.find().populate("arts");
    return res.status(200).json({ artists, status: 200 });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message, status: 400 });
  }
};

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

  try {
    const artist = await Artist.findByIdAndUpdate(id, updateFields, {
      new: true,
    });
    if (!artist) {
      return res.status(404).json({ message: "Artist not found", status: 404 });
    }
    artist.password = undefined;

    return res.status(200).json({
      message: "Artist updated successfully",
      artist: artist.populate("arts"),
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message, status: 400 });
  }
};

module.exports.delete_artist = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "Id is required", status: 400 });
  }

  try {
    await Artist.findByIdAndDelete(id);
    return res
      .status(200)
      .json({ message: "Artist deleted successfully", status: 200 });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message, status: 400 });
  }
};

module.exports.get_artist = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "Id is required", status: 400 });
  }

  try {
    const artist = await Artist.findById(id);
    if (!artist) {
      return res.status(404).json({ message: "Artist not found", status: 404 });
    }
    return res
      .status(200)
      .json({ artist: artist.populate("art"), status: 200 });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message, status: 400 });
  }
};

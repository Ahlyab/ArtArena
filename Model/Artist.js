// art : email, password, profile photo, first name, last name, [arts], [sold arts], total revenue, address, [clients], user_type

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const ArtistSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },

  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },

  user_type: {
    type: String,
    required: true,
  },

  profilePhoto: {
    type: String,
  },

  arts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Art",
    },
  ],

  soldArts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Art",
    },
  ],

  totalRevenue: {
    type: Number,
    default: 0,
  },

  address: {
    type: String,
  },

  clients: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
    },
  ],
});

ArtistSchema.statics.signup = async function (
  email,
  password,
  firstName,
  lastName,
  user_type
) {
  const exist = await this.findOne({ email });

  if (exist) {
    throw Error("Email already in use");
  }

  const salt = await bcrypt.genSalt(12);
  const hash = await bcrypt.hash(password, salt);
  return await this.create({
    email,
    password: hash,
    firstName,
    lastName,
    user_type,
  });
};

ArtistSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  const artist = await this.findOne({ email });

  if (!artist) {
    throw Error("Invalid email or password");
  }

  const match = await bcrypt.compare(password, artist.password);

  if (!match) {
    throw Error("Invalid email or password");
  }

  return artist;
};

const Artist = mongoose.model("Artist", ArtistSchema);

module.exports = Artist;

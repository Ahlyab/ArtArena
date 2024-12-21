// art : email, password, profile photo, first name, last name, [arts], [sold arts], total revenue, address, [clients], user_type

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const ArtistSchema = new mongoose.Schema(
  {
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
      default:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
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
    location: {
      type: {
        type: String, // 'Point' is the only GeoJSON type for geolocation
        enum: ["Point"],
        required: true,
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        required: true,
      },
    },
  },
  { timestamps: true }
);

ArtistSchema.statics.signup = async function (
  email,
  password,
  firstName,
  lastName,
  user_type,
  location
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
    location,
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

  return artist.populate("arts");
};

// add art
ArtistSchema.statics.addArt = async function (artId, artistId) {
  return await this.findByIdAndUpdate(artistId, {
    $push: { arts: artId },
  });
};

ArtistSchema.index({ location: "2dsphere" });

const ArtistModel = mongoose.model("ArtistModel", ArtistSchema);

module.exports = ArtistModel;

// client : email, password, profile photo, first name, last name, [bought], spent_amount, user_type

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const ClientSchema = new mongoose.Schema({
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

  address: {
    type: String,
  },

  bought: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Art",
    },
  ],

  spentAmount: {
    type: Number,
    default: 0,
  },

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
});

ClientSchema.index({ location: "2dsphere" });

ClientSchema.statics.signup = async function (
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

// login

ClientSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  const client = await this.findOne({ email });

  if (!client) {
    throw Error("Email not found");
  }

  const match = await bcrypt.compare(password, client.password);

  if (!match) {
    throw Error("Incorrect password");
  }

  return client;
};

module.exports = mongoose.model("Client", ClientSchema);

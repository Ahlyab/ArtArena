// admin : email, password, profile photo, first name, last name, user_type

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const AdminSchema = new mongoose.Schema({
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
});

AdminSchema.statics.signup = async function (
  email,
  password,
  firstName,
  lastName,
  user_type,
  profilePhoto
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
    profilePhoto,
  });
};

AdminSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  const admin = await this.findOne({ email });

  if (!admin) {
    throw Error("Incorrect email");
  }

  const match = await bcrypt.compare(password, admin.password);

  if (!match) {
    throw Error("Incorrect password");
  }

  return admin;
};

const Admin = mongoose.model("Admin", AdminSchema);

module.exports = Admin;

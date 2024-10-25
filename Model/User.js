const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },

  user_type: {
    type: String,
    required: true,
  },
});

UserSchema.statics.signup = async function (
  firstName,
  lastName,
  email,
  password,
  user_type
) {
  const exist = await this.findOne({ email });

  if (exist) {
    throw Error("Email already in use");
  }

  const salt = await bcrypt.genSalt(12);
  const hash = await bcrypt.hash(password, salt);
  return await this.create({
    firstName,
    lastName,
    email,
    password: hash,
    user_type,
  });
};

UserSchema.statics.login = async function (email, password, user_type) {
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw Error("Incorrect email");
  }

  // check if user_type is not freelancer, client or admin
  if (
    user.user_type !== "freelancer" &&
    user.user_type !== "client" &&
    user.user_type !== "admin"
  ) {
    throw Error("User type is invalid");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Incorrect password");
  }

  return user;
};

module.exports.User = mongoose.model("Users", UserSchema);

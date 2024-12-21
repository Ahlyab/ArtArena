const Admin = require("../../models/admin.model");
const Artist = require("../../models/artist.model");
const Client = require("../../models/client.model");
const { User } = require("../../models/user.model");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

module.exports.user_signup = async (req, res) => {
  const { firstName, lastName, email, password, user_type, location } =
    req.body;

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
  if (!email) {
    return res.status(400).json({ message: "Email is required", status: 400 });
  }
  if (!password) {
    return res
      .status(400)
      .json({ message: "Password is required", status: 400 });
  }
  if (!user_type) {
    return res
      .status(400)
      .json({ message: "User type is required", status: 400 });
  }

  const emailRegex = /\S+@\S+\.\S+/;
  if (!emailRegex.test(req.body.email)) {
    return res.status(400).json({ message: "Email is invalid", status: 400 });
  }

  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
  if (!passwordRegex.test(req.body.password)) {
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

  if (!location) {
    return res
      .status(400)
      .json({ message: "Location is required", status: 400 });
  }

  try {
    let user = null;
    if (user_type === "artist") {
      user = await Artist.signup(
        email,
        password,
        firstName,
        lastName,
        user_type,
        location
      );
    } else if (user_type === "client") {
      user = await Client.signup(
        email,
        password,
        firstName,
        lastName,
        user_type,
        location
      );
    } else if (user_type === "admin") {
      user = await Admin.signup(
        email,
        password,
        firstName,
        lastName,
        user_type
      );
    }
    user.password = undefined;

    return res.status(201).json({
      message: `${user_type} created successfully`,
      user,
      status: 201,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message, status: 400 });
  }
};

module.exports.user_login = async (req, res) => {
  const { email, password, user_type } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required", status: 400 });
  }
  if (!password) {
    return res
      .status(400)
      .json({ message: "Password is required", status: 400 });
  }

  try {
    let user = null;
    if (user_type === "artist") {
      user = await Artist.login(email, password);
    } else if (user_type === "client") {
      user = await Client.login(email, password);
    } else if (user_type === "admin") {
      user = await Admin.login(email, password);
    }

    user.password = undefined;

    const token = jwt.sign(
      { id: user._id, email: user.email, user_type: user.user_type },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.setHeader("Access-Control-Allow-Credentials", "true");

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production" ? true : false,
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: `${user.user_type} logged in successfully`,
      user,
      status: 200,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message, status: 400 });
  }
};

module.exports.user_signout = async (req, res) => {
  res.clearCookie("token");
  return res
    .status(200)
    .json({ message: "User signed out successfully", status: 200 });
};

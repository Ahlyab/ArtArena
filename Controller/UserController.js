const Admin = require("../Model/Admin");
const Artist = require("../Model/Artist");
const Client = require("../Model/Client");
const { User } = require("../Model/User");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

module.exports.user_signup = async (req, res) => {
  // check if first name, last name, email, and password are provided one by one
  const { firstName, lastName, email, password, user_type } = req.body;

  if (!firstName) {
    return res.status(400).json({ message: "First name is required" });
  }
  if (!lastName) {
    return res.status(400).json({ message: "Last name is required" });
  }
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }
  if (!password) {
    return res.status(400).json({ message: "Password is required" });
  }
  if (!user_type) {
    return res.status(400).json({ message: "User type is required" });
  }
  // check if email is valid
  const emailRegex = /\S+@\S+\.\S+/;
  if (!emailRegex.test(req.body.email)) {
    return res.status(400).json({ message: "Email is invalid" });
  }
  // check if password is strong and secure
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
  if (!passwordRegex.test(req.body.password)) {
    return res.status(400).json({ message: "Password is weak" });
  }

  if (
    user_type !== "artist" &&
    user_type !== "client" &&
    user_type !== "admin"
  ) {
    return res.status(400).json({ message: "User type is invalid" });
  }

  try {
    let user = null;
    // create user according to user type
    if (user_type === "artist") {
      user = await Artist.signup(
        email,
        password,
        firstName,
        lastName,
        user_type
      );
    } else if (user_type === "client") {
      user = await Client.signup(
        email,
        password,
        firstName,
        lastName,
        user_type
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
    // remove password from user object
    user.password = undefined;

    return res.status(201).json({
      message: `${user_type} created successfully`,
      user,
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};

module.exports.user_login = async (req, res) => {
  const { email, password, user_type } = req.body;

  // check each if email, password, and user type are provided
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }
  if (!password) {
    return res.status(400).json({ message: "Password is required" });
  }

  try {
    // login user

    let user = null;
    // create user according to user type
    if (user_type === "artist") {
      user = await Artist.login(email, password);
    } else if (user_type === "client") {
      user = await Client.login(email, password);
    } else if (user_type === "admin") {
      user = await Admin.login(email, password);
    }

    // remove password from user object
    user.password = undefined;

    // Create JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email, user_type: user.user_type },
      JWT_SECRET,
      { expiresIn: "1d" } // token expiration time
    );

    res.setHeader("Access-Control-Allow-Credentials", "true");

    // Set token in HttpOnly cookie
    res.cookie("token", token, {
      httpOnly: true, // prevent client-side access to the cookie
      secure: process.env.NODE_ENV === "production" ? true : false, // use secure cookies in production
      maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
    });

    return res.status(200).json({
      message: `${user.user_type} logged in successfully`,
      user,
      status: 200,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports.user_signout = async (req, res) => {
  res.clearCookie("token");
  return res.status(200).json({ message: "User signed out successfully" });
};

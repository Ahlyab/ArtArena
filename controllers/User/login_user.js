const Artist = require("../../models/artist.model");
const Client = require("../../models/client.model");
const Admin = require("../../models/admin.model");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

module.exports.user_login = async (req, res) => {
  const { email, password, user_type } = req.body;
  console.log(email, password, user_type);

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

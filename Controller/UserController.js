const { User } = require("../Model/User");

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

  try {
    // create user
    const user = await User.signup(
      firstName,
      lastName,
      email,
      password,
      user_type
    );
    // remove password from user object
    user.password = undefined;

    return res
      .status(201)
      .json({ message: "User created successfully", user, status: 200 });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

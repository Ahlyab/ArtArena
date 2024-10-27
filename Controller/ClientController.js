const Client = require("../Model/Client");

module.exports.create_client = async (req, res) => {
  const { email, password, firstName, lastName, user_type } = req.body;

  // check if each value is provided

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  if (!password) {
    return res.status(400).json({ message: "Password is required" });
  }

  if (!firstName) {
    return res.status(400).json({ message: "First name is required" });
  }

  if (!lastName) {
    return res.status(400).json({ message: "Last name is required" });
  }

  if (!user_type) {
    return res.status(400).json({ message: "User type is required" });
  }

  // check if email is valid
  const emailRegex = /\S+@\S+\.\S+/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Email is invalid" });
  }

  // check if password is strong and secure
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
  if (!passwordRegex.test(password)) {
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
    let client = await Client.signup(
      email,
      password,
      firstName,
      lastName,
      user_type
    );
    client.password = undefined;

    return res.status(201).json({
      message: `${user_type} created successfully`,
      client,
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};

module.exports.read_clients = async (req, res) => {
  try {
    const clients = await Client.find();
    return res.status(200).json({ clients, status: 200 });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};

module.exports.update_client = async (req, res) => {
  const { id } = req.params;
  const {
    email,
    password,
    firstName,
    lastName,
    user_type,
    profilePhoto,
    address,
    bought,
    spentAmount,
  } = req.body;

  if (!id) {
    return res.status(400).json({ message: "Id is required" });
  }

  // Validate required fields if provided in the request
  if (email && !/\S+@\S+\.\S+/.test(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  if (
    password &&
    !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password)
  ) {
    return res.status(400).json({ message: "Password is weak" });
  }

  try {
    // If a new password is provided, hash it before updating
    let updatedFields = {
      email,
      firstName,
      lastName,
      user_type,
      profilePhoto,
      address,
      bought,
      spentAmount,
    };

    if (password) {
      const salt = await bcrypt.genSalt(12);
      updatedFields.password = await bcrypt.hash(password, salt);
    }

    // Remove undefined fields from updatedFields
    Object.keys(updatedFields).forEach(
      (key) => updatedFields[key] === undefined && delete updatedFields[key]
    );

    const client = await Client.findByIdAndUpdate(id, updatedFields, {
      new: true,
    });

    if (!client) {
      return res.status(404).json({ message: "Client not found", status: 404 });
    }

    return res
      .status(200)
      .json({ message: "Client updated successfully", client, status: 200 });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};

module.exports.delete_client = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "Id is required" });
  }

  try {
    await Client.findByIdAndDelete(id);
    return res.status(200).json({ message: "Client deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};

module.exports.get_client = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "Id is required" });
  }

  try {
    const client = await Client.findById(id);
    return res.status(200).json({ client, status: 200 });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};
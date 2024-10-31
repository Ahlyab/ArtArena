const Client = require("../Model/Client");

module.exports.create_client = async (req, res) => {
  const { email, password, firstName, lastName, user_type, location } =
    req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required", status: 400 });
  }

  if (!password) {
    return res
      .status(400)
      .json({ message: "Password is required", status: 400 });
  }

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

  if (!user_type) {
    return res
      .status(400)
      .json({ message: "User type is required", status: 400 });
  }

  if (!location) {
    return res
      .status(400)
      .json({ message: "Location is required", status: 400 });
  }

  const emailRegex = /\S+@\S+\.\S+/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Email is invalid", status: 400 });
  }

  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
  if (!passwordRegex.test(password)) {
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

  try {
    let client = await Client.signup(
      email,
      password,
      firstName,
      lastName,
      user_type,
      location
    );
    client.password = undefined;

    return res.status(201).json({
      message: `${user_type} created successfully`,
      client,
      status: 201,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message, status: 400 });
  }
};

module.exports.read_clients = async (req, res) => {
  try {
    const clients = await Client.find();
    return res.status(200).json({ clients, status: 200 });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message, status: 400 });
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
    location,
  } = req.body;

  if (!id) {
    return res.status(400).json({ message: "Id is required", status: 400 });
  }

  if (email && !/\S+@\S+\.\S+/.test(email)) {
    return res
      .status(400)
      .json({ message: "Invalid email format", status: 400 });
  }

  if (
    password &&
    !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password)
  ) {
    return res.status(400).json({ message: "Password is weak", status: 400 });
  }

  try {
    let updatedFields = {
      email,
      firstName,
      lastName,
      user_type,
      profilePhoto,
      address,
      bought,
      spentAmount,
      location,
    };

    if (password) {
      const salt = await bcrypt.genSalt(12);
      updatedFields.password = await bcrypt.hash(password, salt);
    }

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
    return res.status(400).json({ message: error.message, status: 400 });
  }
};

module.exports.delete_client = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "Id is required", status: 400 });
  }

  try {
    await Client.findByIdAndDelete(id);
    return res
      .status(200)
      .json({ message: "Client deleted successfully", status: 200 });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message, status: 400 });
  }
};

module.exports.get_client = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "Id is required", status: 400 });
  }

  try {
    const client = await Client.findById(id);
    if (!client) {
      return res.status(404).json({ message: "Client not found", status: 404 });
    }
    return res.status(200).json({ client, status: 200 });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message, status: 400 });
  }
};

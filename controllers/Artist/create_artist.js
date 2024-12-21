const Artist = require("../../models/artist.model");

module.exports.create_artist = async (req, res) => {
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

    if (!location) {
        return res
            .status(400)
            .json({ message: "Location is required", status: 400 });
    }

    try {
        const artist = await Artist.signup(
            email,
            password,
            firstName,
            lastName,
            user_type,
            location
        );

        return res.status(201).json({
            message: `${user_type} created successfully`,
            artist,
            status: 200,
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: error.message, status: 400 });
    }
};

const Artist = require("../../models/artist.model");
const Client = require("../../models/client.model");
const Admin = require("../../models/admin.model");
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

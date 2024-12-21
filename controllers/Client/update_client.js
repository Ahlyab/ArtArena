const Client = require("../../models/client.model");


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

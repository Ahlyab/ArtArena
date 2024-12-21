const Client = require("../../models/client.model");


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

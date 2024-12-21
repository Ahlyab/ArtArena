const Client = require("../../models/client.model");


module.exports.get_clients = async (req, res) => {
    try {
        const clients = await Client.find();
        return res.status(200).json({ clients, status: 200 });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: error.message, status: 400 });
    }
};

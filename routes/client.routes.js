// create routes for Client operations

const express = require("express");
const {get_clients} = require("../controllers/Client/get_clients");
const {create_client} = require("../controllers/Client/create_client");
const {update_client} = require("../controllers/Client/update_client");
const {delete_client} = require("../controllers/Client/delete_client");
const {get_client} = require("../controllers/Client/get_client");



const router = express.Router();

router.post("/create_client", create_client);
router.get("/get_clients", get_clients);
router.put("/update_client/:id", update_client);
router.delete("/delete_client/:id", delete_client);
router.get("/get_client/:id", get_client);

module.exports = router;

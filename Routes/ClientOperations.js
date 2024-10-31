// create routes for Client operations

const express = require("express");

const {
  create_client,
  read_clients,
  update_client,
  delete_client,
  get_client,
} = require("../Controller/ClientController");

const router = express.Router();

router.post("/create_client", create_client);
router.get("/get_clients", read_clients);
router.put("/update_client/:id", update_client);
router.delete("/delete_client/:id", delete_client);
router.get("/get_client/:id", get_client);

module.exports = router;

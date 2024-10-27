// create routes for Artist operations

const express = require("express");
const {
  create_artist,
  get_artists,
  update_artist,
  delete_artist,
  get_artist,
} = require("../Controller/ArtistController");

const router = express.Router();

router.post("/create_artist", create_artist);
router.get("/get_artists", get_artists);
router.put("/update_artist/:id", update_artist);
router.delete("/delete_artist/:id", delete_artist);
router.get("/get_artist/:id", get_artist);

module.exports = router;

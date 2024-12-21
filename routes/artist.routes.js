// create routes for Artist operations

const express = require("express");
const {create_artist} = require("../controllers/Artist/create_artist");
const {get_artists} = require("../controllers/Artist/get_artists");
const {getNearbyArtist} = require("../controllers/Artist/get_nearby_artist");
const {update_artist} = require("../controllers/Artist/update_artist");
const {delete_artist} = require("../controllers/Artist/delete_artist");
const {get_artist} = require("../controllers/Artist/get_artist");


const router = express.Router();

router.post("/create_artist", create_artist);
router.get("/get_artists", get_artists);
router.get("/get_nearby_artists", getNearbyArtist);
router.put("/update_artist/:id", update_artist);
router.delete("/delete_artist/:id", delete_artist);
router.get("/get_artist/:id", get_artist);

module.exports = router;

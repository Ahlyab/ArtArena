const express = require("express");
const router = express.Router();

// Import functions from the Art controller

const authenticateToken = require("../middleware/auth.middleware");
const {advancedSearch} = require("../controllers/Art/advanced_search");
const {create_art} = require("../controllers/Art/create_art");
const {get_arts} = require("../controllers/Art/get_arts");
const {get_art} = require("../controllers/Art/get_art");
const {get_arts_by_artist} = require("../controllers/Art/get_arts_by_artist");
const {get_recent_arts} = require("../controllers/Art/get_recent_arts");
const {update_art} = require("../controllers/Art/update_art");
const {delete_art} = require("../controllers/Art/delete_art");
const {sell_art} = require("../controllers/Art/sell_art");
const {buy_art} = require("../controllers/Art/buy_art");
const {search_art} = require("../controllers/Art/search_art");
const {filter_art} = require("../controllers/Art/filter_art");
const {sort_art} = require("../controllers/Art/sort_art");
const {paginate_art} = require("../controllers/Art/paginate_art");


// public route
router.get("/search", advancedSearch);

// private routes
router.use(authenticateToken);
router.post("/create_art", create_art);
router.get("/get_arts", get_arts);
router.get("/get_art/:id", get_art);
router.get("/get_arts_by_artist/:artistId", get_arts_by_artist);
router.get("/get_recent_arts", get_recent_arts);
router.put("/update_art/:id", update_art);
router.delete("/delete_art/:id", delete_art);
router.post("/sell_art/:id", sell_art);
router.post("/buy_art/:id", buy_art);
router.get("/search_art", search_art);
router.get("/filter_art", filter_art);
router.get("/sort_art", sort_art);
router.get("/paginate_art", paginate_art);

module.exports = router;

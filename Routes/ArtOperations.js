const express = require("express");
const router = express.Router();

// Import functions from the Art controller
const {
  create_art,
  get_arts,
  get_arts_by_artist,
  get_recent_arts,
  get_art,
  update_art,
  delete_art,
  sell_art,
  buy_art,
  search_art,
  filter_art,
  sort_art,
  paginate_art,
  advancedSearch,
} = require("../Controller/ArtController");
const authenticateToken = require("../Middleware/AuthMiddleware");

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

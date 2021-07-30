var express = require("express");
var router = express.Router();
var newsfeedController = require("../controllers/newfeedsController");

/* GET home page. */
router.get("/", newsfeedController.index);
router.post("/like", newsfeedController.handleLike)
router.get("/detailLiked", newsfeedController.handleDeitailLiked);
router.get("/comment", newsfeedController.handleShowComment);
router.post("/comment", newsfeedController.handleAddComment);
module.exports = router;

var express = require("express");
var router = express.Router();
var newsfeedController = require("../controllers/newfeedsController");

/* GET home page. */
router.get("/", newsfeedController.index);
router.post("/like", newsfeedController.handelLike)
router.get("/detailLiked", newsfeedController.handelDeitailLiked);
router.post("/comment", newsfeedController.handelAddComment);
module.exports = router;

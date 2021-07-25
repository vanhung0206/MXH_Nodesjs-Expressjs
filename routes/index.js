var express = require("express");
var router = express.Router();
var newsfeedController = require("../controllers/newfeedsController");

/* GET home page. */
router.get("/", newsfeedController.index);

module.exports = router;

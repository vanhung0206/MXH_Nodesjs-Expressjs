var express = require("express");
var router = express.Router();
var blogsController = require("../controllers/blogsController");

/* GET home page. */
router.get("/", blogsController.index);

module.exports = router;

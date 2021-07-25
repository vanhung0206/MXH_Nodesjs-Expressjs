var express = require("express");
var router = express.Router();
var membersController = require("../controllers/membersController");

/* GET home page. */
router.get("/", membersController.index);

module.exports = router;

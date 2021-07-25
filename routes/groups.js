var express = require("express");
var router = express.Router();
var groupsController = require("../controllers/groupsController");

/* GET home page. */
router.get("/", groupsController.index);

module.exports = router;

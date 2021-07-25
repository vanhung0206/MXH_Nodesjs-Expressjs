var express = require("express");
var router = express.Router();
var logoutController = require("../controllers/logoutController");

/* GET home page. */
router.get("/", logoutController.index);

module.exports = router;

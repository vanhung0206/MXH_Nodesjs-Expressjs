var express = require("express");
var router = express.Router();
var verifyController = require("../controllers/verifyController");

/* GET home page. */
router.get("/", verifyController.index);

module.exports = router;

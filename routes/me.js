var express = require("express");
var router = express.Router();
var meController = require("../controllers/meController");

/* GET home page. */
router.get("/edit", meController.edit);
router.post("/edit", meController.update);

module.exports = router;

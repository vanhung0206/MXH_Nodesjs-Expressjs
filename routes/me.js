var express = require("express");
var router = express.Router();
var meController = require("../controllers/meController");

/* GET home page. */
router.get("/edit/password", meController.changpassword);
router.post("/edit/password", meController.updatepassword);
router.get("/edit", meController.edit);
router.post("/edit", meController.update);

module.exports = router;

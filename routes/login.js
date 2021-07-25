var express = require("express");
var router = express.Router();
var loginController = require("../controllers/loginController");

/* GET home page. */
router.post("/register", loginController.register);
router.get("/", loginController.index);
router.post("/", loginController.login);

module.exports = router;

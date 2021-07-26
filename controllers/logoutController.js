const { json } = require("express");
const users = require("../models/users");

// var session = require("express-session");

class logoutController {
    //[GET] /logout
    index(req, res, next) {
        req.session.destroy((err) => {
            if (err) next();
            else {
                res.redirect("/login");
            }
        });
    }
}

module.exports = new logoutController();

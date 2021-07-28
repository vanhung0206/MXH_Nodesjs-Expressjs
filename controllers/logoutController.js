const { json } = require("express");
const users = require("../models/users");

// var session = require("express-session");

class logoutController {
    //[GET] /logout
    async index(req, res, next) {
        var dateNow = new Date();
        var user = await users.findOneAndUpdate({_id: req.session.userInfo._id }, {logoutAt: dateNow} , {new: true});
        if (user) {
            req.session.destroy((err) => {
                if (err) next();
                else {
                    res.redirect("/login");
                }
            });
        } else {
            res.status(404).send("Unknown Error");
        }
    }
}

module.exports = new logoutController();

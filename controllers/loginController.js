const { json } = require("express");
const users = require("../models/users");
// var session = require("express-session");

class loginController {
    // [GET] /login
    index(req, res, next) {
        res.render("login", {
            layout: false,
            title: "login",
        });
    }

    // [POST] /login/register
    async register(req, res, next) {
        var userData = req.body;
        var user = new users(userData);
        var data = await users.findOne({ email: userData.email });
        if (data) {
            res.json({ err: "Email already in use!" });
        } else {
            user.save((err, data) => {
                if (err) {
                    next();
                } else {
                    res.json({
                        result: true,
                        err: false,
                    });
                }
            });
        }
    }

    // [POST] /login
    async login(req, res, next) {
        var userData = req.body;
        var user = new users(userData);
        var data = await users.findOne({ email: userData.email });
        if (data && data.password === userData.password) {
            req.session.userInfo = data;
            res.redirect("/");
        } else {
            res.json({ err: "Email or Password Invalid" });
        }
    }
}

module.exports = new loginController();

const { json } = require("express");
const users = require("../models/users");
const nodemailer = require("nodemailer");
const {getToken, verifyToken} = require("../dao/token");
var setHtml = require("../dao/getHtml")


// var session = require("express-session");





function sendmail(tomail, heading, contents, callback ) {
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "bocau.duathu.web@gmail.com",
            pass: "Vhung0206",
        },
    });
    var mailOptions = {
        from: "bocau.duathu.web@gmail.com",
        to: tomail,
        subject: heading,
        html: contents,
    };
    transporter.sendMail(mailOptions, callback);
}

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
                    const token = getToken({email: data.email});
                    let link = `http://127.0.0.1:3000/verify?token=${token}`;
                    let html = setHtml(data.email,data.name , link)
                    sendmail(data.email, "[HTH] Please verify your email address." , html , (err , info) => {
                        if(err)
                            res.json(err)
                        else
                            res.json({
                                result: true,
                                err: false,
                            })
                    })
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
            if(data.status === 0) { 
                res.render("login", {
                    layout: false,
                    title: "login",
                    err: "Email is not verified"
                });
            }
            else{
                req.session.userInfo = data;
                req.session.save(err => {
                    res.redirect("/");
                });
            }
        } else {
            res.render("login", {
                layout: false,
                title: "login",
                err: "Email or Password Invalid!",
            });
        }
    }
}

module.exports = new loginController();

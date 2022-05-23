const { json } = require("express");
const users = require("../models/users");
const nodemailer = require("nodemailer");
const { getToken, verifyToken } = require("../dao/token");
var setHtml = require("../dao/getHtml");
var getHtmlReset = require("../dao/getHtmlReset");
const { encode, decode } = require("../dao/bcryptPassword");
const baseURL = process.env.BASE_URL || "http://127.0.0.1:3000";
const port = parseInt(process.env.PORT || 3000);
const domain = baseURL + ":" + port;
// var session = require("express-session");

function sendmail(tomail, heading, contents, callback) {
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.GMAIL || "bocau.duathu.web@gmail.com",

            pass: process.env.PASSWORD || "Vhung0206",
        },
    });
    var mailOptions = {
        from: process.env.GMAIL || "bocau.duathu.web@gmail.com",
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

        userData.password = encode(userData.password);
        var user = new users(userData);
        var data = await users.findOne({ email: userData.email });
        if (data) {
            res.json({ err: "Email already in use!" });
        } else {
            user.save((err, data) => {
                if (err) {
                    next();
                } else {
                    const token = getToken({ email: data.email });
                    let link = `${domain}/verify?token=${token}`;
                    let html = setHtml(data.email, data.name, link);
                    sendmail(
                        data.email,
                        "[HTH] Please verify your email address.",
                        html,
                        (err, info) => {
                            if (err) res.json(err);
                            else
                                res.json({
                                    result: true,
                                    err: false,
                                });
                        }
                    );
                }
            });
        }
    }

    // [POST] /login
    async login(req, res, next) {
        var userData = req.body;
        var user = new users(userData);
        var data = await users.findOne({ email: userData.email });

        if (data) {
            var passwordResult = decode(userData.password, data.password);
            if (!passwordResult) {
                res.render("login", {
                    layout: false,
                    title: "login",
                    err: "Email or Password Invalid!",
                });
                return;
            }
            if (data.status === 0) {
                res.render("login", {
                    layout: false,
                    title: "login",
                    err: "Email is not verified",
                });
            } else {
                req.session.userInfo = data;
                req.session.save((err) => {
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

    // [GET] /login/forgot password
    forgot(req, res, next) {
        res.render("login/forgot", {
            layout: false,
            title: "Forgot Password",
        });
    }
    // [POST] /login/forgot password
    resetPassword(req, res, next) {
        users.findOne({ email: req.body.email }, (err, user) => {
            if (err || !user) {
                res.render("login/forgot", {
                    layout: false,
                    title: "Forgot Password",
                    err: "Gmail does not exist in our system!",
                });
            } else {
                const token = getToken({ email: user.email });
                let link = `${domain}/login/reset?token=${token}`;
                let html = getHtmlReset(user.name, link);
                sendmail(
                    user.email,
                    "[HTH] Reset your HTH account password",
                    html,
                    (err1, info) => {
                        if (err1) {
                            res.render("login/forgot", {
                                layout: false,
                                title: "Forgot Password",
                                err: "An error occurred while sending mail!",
                            });
                        } else {
                            res.render("login/forgot", {
                                layout: false,
                                title: "Forgot Password",
                                success:
                                    "We have sent an email to you. Please visit the link we sent to reset your password!",
                            });
                        }
                    }
                );
            }
        });
    }

    //[GET] /login/reset
    reset(req, res, next) {
        if (req.query.token) {
            verifyToken(req.query.token, (err, decoded) => {
                if (err) res.status(404).send("Token Invalid!");
                else {
                    users.findOne({ email: decoded.email }, (err, user) => {
                        if (err) {
                            res.status(404).send("Email Invalid");
                        } else {
                            res.render("login/reset", {
                                layout: false,
                                title: "Reset Password",
                                token: req.query.token,
                            });
                        }
                    });
                }
            });
        } else {
            res.status(404).send("Token Invalid!");
        }
    }

    //[POST] /login/reset
    saveResetPassword(req, res, next) {
        verifyToken(req.body.token, (err, decoded) => {
            if (err) res.status(404).send("Token Invalid!");
            else if (
                req.body.password !== req.body.repassword ||
                !req.body.password
            )
                res.status(404).send("Password Invalid!");
            else {
                users.findOneAndUpdate(
                    { email: decoded.email },
                    { password: encode(req.body.password) },
                    { new: true },
                    (err, user) => {
                        if (err) res.status(404).send("Error Unknown");
                        else {
                            res.redirect("/");
                        }
                    }
                );
            }
        });
    }
}

module.exports = new loginController();

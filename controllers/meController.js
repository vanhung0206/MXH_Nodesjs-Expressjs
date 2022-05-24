const { json } = require("express");
const { copyFileSync } = require("fs");
const { request } = require("https");
var path = require("path");
const { encode, decode } = require("../dao/bcryptPassword");
const users = require("../models/users");
const usersModal = require("../models/users");

class meController {
    // [GET] /me/edit
    edit(req, res, next) {
        res.render("me/editlayout", {
            layout: "index",
            title: "me",
        });
        // res.json(res.locals);
    }
    // [GET] /me/edit/password
    changpassword(req, res, next) {
        res.render("me/changepassword", {
            layout: "index",
            title: "me",
        });
        // res.json(res.locals);
    }
    // [POST] /me/edit/password
    updatepassword(req, res, next) {
        // res.json(req.session.userInfo.password);
        var comparPassword = decode(
            req.body.currentPassword,
            req.session.userInfo.password
        );
        if (!comparPassword) {
            res.render("me/changepassword", {
                layout: "index",
                title: "Change password",
                err: "Password Invalid!",
            });
        } else if (
            req.body.password !== req.body.repassword ||
            !req.body.password
        ) {
            res.render("me/changepassword", {
                layout: "index",
                title: "Change password",
                err: "New Password Invalid!",
            });
        } else {
            var newPassword = encode(req.body.password);
            users.findOneAndUpdate(
                { email: req.session.userInfo.email },
                { password: newPassword },
                { new: true },
                (err1, user) => {
                    if (err1) {
                        res.render("me/changepassword", {
                            layout: "index",
                            title: "Change password",
                            err: err1,
                        });
                    } else {
                        req.session.userInfo = user;
                        req.session.save((err3) => {
                            if (err3) {
                                res.render("me/changepassword", {
                                    layout: "index",
                                    title: "Change password",
                                    err: err3,
                                });
                            } else {
                                res.render("me/changepassword", {
                                    layout: "index",
                                    title: "Change password",
                                    success: "Successfully Changed!",
                                });
                            }
                        });
                    }
                }
            );
        }
    }

    // [POST] /me/edit
    update(req, res, next) {
        let sampleFile;
        let uploadPath;
        if (req.files && Object.keys(req.files).length !== 0) {
            sampleFile = req.files.image;
            var tempPath = __dirname.split("\\");
            tempPath.pop();
            tempPath.push("public", "images", "avatars");
            tempPath = tempPath.join("\\");
            uploadPath = tempPath + "/" + sampleFile.name;
            sampleFile.mv(uploadPath, function (err) {
                console.log(
                    "🚀 ~ file: meController.js ~ line 96 ~ meController ~ uploadPath",
                    uploadPath
                );
                if (err) {
                    console.log(
                        "🚀 ~ file: meController.js ~ line 97 ~ meController ~ err",
                        err
                    );
                    return res.json({ err: "Unknow Error" });
                }
                req.session.userInfo = req.body;
                req.session.userInfo.image =
                    "/images/avatars/" + sampleFile.name;
                req.session.save((err) => {
                    usersModal
                        .findOneAndUpdate(
                            { email: req.body.email },
                            req.session.userInfo,
                            { new: true }
                        )
                        .then((data) => {
                            req.session.userInfo = data;
                            req.session.save(function (err) {
                                res.locals.userInfo = data;
                                res.render("me/editlayout", {
                                    layout: "index",
                                    title: "me",
                                    success: true,
                                });
                            });
                        })
                        .catch((err) => res.json({ err: "Unknow Error" }));
                });
            });
        } else {
            usersModal
                .findOneAndUpdate({ email: req.body.email }, req.body, {
                    new: true,
                })
                .then((data) => {
                    req.session.userInfo = data;
                    req.session.save(function (err) {
                        // session saved
                        res.locals.userInfo = data;
                        res.render("me/editlayout", {
                            layout: "index",
                            title: "me",
                            success: true,
                        });
                    });
                })
                .catch((err) => res.json({ err: "Unknow Error" }));
        }
    }
}

module.exports = new meController();

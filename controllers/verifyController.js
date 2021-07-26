const { json } = require("express");
const users = require("../models/users");
const nodemailer = require("nodemailer");
const {getToken, verifyToken} = require("../dao/token");
var setHtml = require("../dao/getHtml")

class verifyController {
    // [GET] /verify
    index(req, res, next) {
        if(req.query.token) {
            verifyToken(req.query.token, (err, decoded) => {
                if(err) res.status(404).send("Token Invalid");
                else {
                    users.findOneAndUpdate({ email: decoded.email}, {status: 1}, {new: true}, (err, user) => {
                        if(err){
                            res.status(404).send("Email Invalid");
                        }
                        else {
                            res.status(200).send("<h1>Successful Verification!</h1>")
                        }

                    })
                }
            })
        }else {
           res.status(404).send("Token Invalid")
        }

    }
}

module.exports = new verifyController();
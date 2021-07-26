const { copyFileSync } = require("fs");
const { request } = require("https");
var path = require("path");
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

    // [POST] /me/edit
    update(req, res, next) {
        let sampleFile;
        let uploadPath;
        if (req.files && Object.keys(req.files).length !== 0) {
            sampleFile = req.files.image;
            var tempPath = __dirname.split("\\")
            tempPath.pop();
            tempPath.push("public","images", "avatars");
            tempPath = tempPath.join("\\")
            uploadPath =  tempPath + "/"+ sampleFile.name;
            sampleFile.mv(uploadPath, function (err) {
                if (err) return res.json({err: "Unknow Error"}) 
                else {
                    req.session.userInfo.image = "/images/avatars/"+ sampleFile.name;
                    
                    usersModal.findOneAndUpdate({email: req.body.email },  req.session.userInfo, { new: true })
                        .then((data) => {
                            req.session.userInfo = data;
                            res.locals.userInfo = data;
                            res.render("me/editlayout", {
                                layout: "index",
                                title: "me",
                                success: true,
                            });
                        })
                        .catch(err => res.json({err: "Unknow Error"}));
                }
            });
        } else {
            usersModal.findOneAndUpdate({email: req.body.email },  req.body , { new: true } )
                .then((data) => {
                    req.session.userInfo = data;
                    res.locals.userInfo = data;
                    res.render("me/editlayout", {
                        layout: "index",
                        title: "me",
                        success: true,
                    });
                })
                .catch(err => res.json({err: "Unknow Error"}));
        }
        
        
        
    }
}

module.exports = new meController();

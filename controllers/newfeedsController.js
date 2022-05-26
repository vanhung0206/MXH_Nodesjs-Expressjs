const Posts = require("../models/post");
const Users = require("../models/users");
const convertTime = require("../dao/timeAgo");
const { json } = require("express");
const insertImage = require("../dao/insertImage.js");
class newfeedsController {
    // [GET] /
    async index(req, res, next) {
        // render Posts
        const userInfo = req.session.userInfo;
        const posts = await Posts.find({}).sort([["createdAt", -1]]);
        if (posts && posts[0]) {
            var timeNow = new Date();
            var newMap = [];
            for (let post of posts) {
                let objTemp = post.toObject();
                var HaveUserId = post.react.find(
                    (idPost) => req.session.userInfo._id == idPost
                );
                if (HaveUserId) {
                    objTemp.isLike = 1;
                } else {
                    objTemp.isLike = 0;
                }
                objTemp.ago = convertTime(timeNow, Date.parse(post.createdAt));
                let user = await Users.findById(objTemp.idUser, [
                    "name",
                    "updatedAt",
                    "image",
                ]);
                if (user) {
                    objTemp.imgUser = user.image;
                    objTemp.name = user.name;
                    newMap.push(objTemp);
                } else {
                    continue;
                }
            }
            res.render("newsfeed/newsfeedlayout", {
                layout: "index",
                title: "Home",
                posts: newMap,
            });
        } else {
            res.render("newsfeed/newsfeedlayout", {
                layout: "index",
                title: "Home",
                posts: null,
            });
        }
    }
    // [POST] /like
    async handleLike(req, res, next) {
        if (req.body.id) {
            var post = await Posts.findOne({ _id: req.body.id }, ["react"]);
            var HaveUserId = post.react.find(
                (idPost) => req.session.userInfo._id == idPost
            );
            if (!post) {
                res.json({ error: "Unknown Error" });
            } else if (!HaveUserId) {
                post.react.push(req.session.userInfo._id);
                await post.save();
                res.json({
                    isLiked: 1,
                    countLike: post.react.length,
                });
            } else {
                post.react.remove(HaveUserId);
                await post.save();
                res.json({
                    isLiked: 0,
                    countLike: post.react.length,
                });
            }
        }
    }
    // [GET] /comment
    async handleShowComment(req, res, next) {
        if (req.query.id) {
            var post = await Posts.findOne({ _id: req.query.id }, [
                "comments",
            ]).sort({
                "comments.createdAt": -1,
            });
            if (!post) {
                //No found any post
                res.json({ err: "Unknown Error" });
            } else if (!post.comments[0]) {
                //No have comments in post
                res.json({ comments: [] });
            } //Have comments in post
            else {
                var post = post.toObject();
                let listPromise = [];
                for (let comment of post.comments) {
                    listPromise.push(
                        Users.findOne({ _id: comment.userId }, [
                            "name",
                            "image",
                        ])
                    );
                }
                Promise.all(listPromise)
                    .then((datas) => {
                        let timeNow = new Date();
                        var result = post.comments.map((comment) => {
                            let x = datas.find(
                                (data) =>
                                    data._id.toString() ==
                                    comment.userId.toString()
                            );
                            comment.name = x.name;
                            comment.image = x.image;
                            comment.timeAgo = convertTime(
                                timeNow,
                                Date.parse(comment.createdAt)
                            );
                            return comment;
                        });
                        result.sort(
                            (a, b) =>
                                Date.parse(b.createdAt) -
                                Date.parse(a.createdAt)
                        );
                        res.json(result);
                    })
                    .catch((err) => res.json({ err: err }));
            }
        }
        //  Posts.findOneAndUpdate({_id: '6100d38b20791d448ca1ffaa'}, { $push : { comments: comment}} , {new: true}, (err, data ) => {
        //     res.json(data);
        //  })
    }

    //[POST] /comment

    async handleAddComment(req, res, next) {
        if (req.body.id) {
            var post = await Posts.findById(req.body.id);
            if (post) {
                let comment = {
                    userId: req.session.userInfo._id,
                    content: req.body.content,
                };
                post.comments.push(comment);
                post.save((err) => {
                    if (err) res.json({ err: "Unknown Error" });
                    else res.json({ err: false });
                });
            } else {
                res.json({ err: "Unknown Error" });
            }
        } else {
            res.json({ err: "Unknown Error" });
        }
    }

    // [GET] /detailLiked
    async handleDeitailLiked(req, res, next) {
        let post = await Posts.findById(req.query.id);
        if (post) {
            let promiseAll = [];
            for (let react of post.react) {
                promiseAll.push(Users.findById(react, ["name", "image"]));
            }
            Promise.all(promiseAll)
                .then((data) => res.json(data))
                .catch((err) => res.json(err));
        } else {
            res.json({ err: "Unknown Error" });
        }
    }

    // [POST] /post
    handleAddPost(req, res, next) {
        if (req.files && Object.keys(req.files).length !== 0) {
            insertImage(req, "posts", (err, path) => {
                if (err) {
                    console.log(
                        "🚀 ~ file: newfeedsController.js ~ line 163 ~ newfeedsController ~ insertImage ~ err",
                        err
                    );
                    res.json(err);
                } else {
                    let post = new Posts({
                        idUser: req.session.userInfo._id,
                        content: req.body.content,
                        image: path,
                    });
                    post.save((err) => {
                        if (err) {
                            console.log(
                                "🚀 ~ file: newfeedsController.js ~ line 193 ~ newfeedsController ~ post.save ~ err",
                                err
                            );
                            res.json(err);
                        } else {
                            res.redirect("/");
                        }
                    });
                }
            });
        } else {
            let post = new Posts({
                idUser: req.session.userInfo._id,
                content: req.body.content,
            });
            post.save((err) => {
                if (err) {
                    console.log(
                        "🚀 ~ file: newfeedsController.js ~ line 207 ~ newfeedsController ~ post.save ~ err",
                        err
                    );
                    res.json({ err });
                } else {
                    res.redirect("/");
                }
            });
        }
    }
}

module.exports = new newfeedsController();

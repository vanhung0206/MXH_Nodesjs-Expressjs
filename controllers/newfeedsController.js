const Posts = require("../models/post")
const Users = require("../models/users")
const convertTime = require("../dao/timeAgo");
const { json } = require("express");

class newfeedsController {

    // [GET] /
    async index(req, res, next) {
        // render Posts
        const userInfo = req.session.userInfo;
        const posts = await Posts.find({}).sort([['createdAt', -1]]);
        if (posts && posts[0]) {
            var timeNow = new Date();
            var newMap = [];
            for(let post of posts) {
                let objTemp =  post.toObject();
                var HaveUserId = post.react.find( (idPost) => req.session.userInfo._id == idPost);
                if (HaveUserId){
                    objTemp.isLike = 1;
                }
                else {
                    objTemp.isLike = 0;
                }
                objTemp.ago = convertTime(timeNow, Date.parse(post.createdAt));
                let user = await Users.findById(objTemp.idUser, ['name','updatedAt','image']);
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
                posts: newMap
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
    async handelLike(req, res, next) {
        if( req.body.id ) {
            var post = await Posts.findOne({_id: req.body.id},['react']);
            var HaveUserId = post.react.find( (idPost) => req.session.userInfo._id == idPost);
            if(!post) {
                res.json({error: "Unknown Error"})
            }
            else if (!HaveUserId) {
                post.react.push(req.session.userInfo._id);
                await post.save();
                res.json( {
                    isLiked: 1,
                    countLike: post.react.length,
                });
            } else {
                post.react.remove(HaveUserId);
                await post.save();
                res.json( {
                    isLiked: 0,
                    countLike: post.react.length,
                });
            }
        }

    }
    // [POST] /comment
    async handelAddComment(req, res, next) {
        if( req.body.id ) {
            var post = await Posts.findOne({_id: req.body.id},['comments']).sort({
                "comments.createdAt": -1
            });
            if ( !post ){ //No found any post
                res.json({err: "Unknown Error"})
            }
            else if (!post.comments[0]) { //No have comments in post
                res.json({comments: []})
            } else //Have comments in post
            {
                var post = post.toObject();
                let listPromise = []
                // res.json(post.comments);
                for(let comment of post.comments) {
                    listPromise.push(Users.findOne({_id: comment.userId}, ["name", "image"]));
                }
                Promise.all(listPromise)
                    .then(datas => {
                        let timeNow = new Date()
                        var result = post.comments.map((comment) => {
                            var x = datas.find(data => data._id == comment.userId );
                            comment.name = x.name; 
                            comment.image = x.image;
                            comment.timeAgo = convertTime(timeNow, Date.parse(comment.createdAt));
                            return comment;
                        })
                        result.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
                        res.json(result);
                    })
                    .catch(err => res.json({err: err}));
            }
        }
        //  Posts.findOneAndUpdate({_id: '6100d38b20791d448ca1ffaa'}, { $push : { comments: comment}} , {new: true}, (err, data ) => {
        //     res.json(data);
        //  })
    }

    // [GET] /detailLiked
    async handelDeitailLiked(req, res, next) {
        let post = await Posts.findById(req.query.id);
        if (post) {
            let promiseAll = [];
            for( let react of post.react ) {
                promiseAll.push(Users.findById(react, ["name" , "image"]));
            }
            Promise.all(promiseAll)
                .then(data => res.json(data))
                .catch(err => res.json(err));
        } else {
            res.json({err: "Unknown Error"});
        }
    }
}

module.exports = new newfeedsController();

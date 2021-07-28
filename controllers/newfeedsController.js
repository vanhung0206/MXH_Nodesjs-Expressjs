const Posts = require("../models/post")
const Users = require("../models/users")
const convertTime = require("../dao/timeAgo");

class newfeedsController {

    // [GET] /
    async index(req, res, next) {
        const userInfo = req.session.userInfo;
        const posts = await Posts.find({}).sort([['updatedAt', -1]]);
        if (posts && posts[0]) {
            var timeNow = new Date();
            var newMap = [];
            for(let post of posts) {
                let objTemp =  post.toObject();
                objTemp.ago = convertTime(timeNow, Date.parse(post.updatedAt));
                let user = await Users.findById(objTemp.idUser, ['name','updatedAt']);
                if (user) {
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
}

module.exports = new newfeedsController();

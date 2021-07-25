class newfeedsController {
    index(req, res, next) {
        res.render("newsfeed/newsfeedlayout", {
            layout: "index",
            title: "Home",
        });
    }
}

module.exports = new newfeedsController();

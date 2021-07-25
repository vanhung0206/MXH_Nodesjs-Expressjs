class blogsController {
    // [GET] /blogs
    index(req, res, next) {
        res.render("blogs/blogslayout", {
            layout: "index",
            title: "blogs",
        });
    }
}

module.exports = new blogsController();

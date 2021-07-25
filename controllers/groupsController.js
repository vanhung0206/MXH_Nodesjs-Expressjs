class groupsController {
    // [GET] /groups
    index(req, res, next) {
        res.render("groups/groupslayout", {
            layout: "index",
            title: "groups",
        });
    }
}

module.exports = new groupsController();

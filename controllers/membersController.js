class membersController {
    // [GET] /members
    index(req, res, next) {
        res.render("members/memberslayout", {
            layout: "index",
            title: "members",
        });
    }
}

module.exports = new membersController();

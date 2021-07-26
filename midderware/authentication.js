module.exports = function (req, res, next) {
    if (req.session.userInfo) {
        res.locals.userInfo = req.session.userInfo;
        next();
    } else {
        res.redirect("/login");
    }
};

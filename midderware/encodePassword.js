const {encode, decode} = require("../dao/bcryptPassword");


module.exports = async function (req, res, next) {
    if ( req.body.password) {
        req.body.password = await encode(req.body.password);
    } else if ( req.query.password) {
        req.query.password = await encode(req.query.password);
    }
    next();
};

const jwt = require('jsonwebtoken');


module.exports.getToken = function (email) {
    return jwt.sign(email, process.env.TOKEN_SECRET, { expiresIn: '24h' });
}

module.exports.verifyToken = function (token, callback) {
    // callback(err, decoded)
    jwt.verify(token, process.env.TOKEN_SECRET, callback);
}
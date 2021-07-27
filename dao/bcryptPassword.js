const bcrypt = require("bcryptjs")


module.exports.encode = function( password) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
}

module.exports.decode =  function( password, passwordEncoded) {
    const passLogin = bcrypt.compareSync(password, passwordEncoded);
    return passLogin;
}
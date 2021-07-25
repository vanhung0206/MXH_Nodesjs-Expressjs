const mongoose = require("mongoose");

function connect() {
    mongoose.connect("mongodb://localhost/socialnetwork", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "connection error:"));
    db.once("open", function () {
        console.log("we're connected!");
    });
}

module.exports = connect;
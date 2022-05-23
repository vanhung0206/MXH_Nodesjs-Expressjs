const mongoose = require("mongoose");
const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/socialNetwork";
function connect() {
    mongoose.connect(mongoUrl, {
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

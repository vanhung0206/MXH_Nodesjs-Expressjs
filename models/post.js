const mongoose = require("mongoose");
mongoose.set('useFindAndModify', false);

const posts = new mongoose.Schema(
    {
        idUser: mongoose.Schema.Types.ObjectId,
        content: {
            type: String,
        },
        type: {
            type: String,
            default: 0,
        },
        image: {
            type: String,
            maxLength: 1000,
        },
        react: [mongoose.Schema.Types.ObjectId],
        comment: mongoose.Schema.Types.ObjectId,
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("posts", posts);

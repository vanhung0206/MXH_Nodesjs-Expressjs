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
            default: "post",
        },
        image: {
            type: String,
            maxLength: 1000,
        },
        comments : [{
            userId: {
                type: mongoose.Schema.ObjectId,
            },
            content: String,
            createdAt: { 
                type: Date,
                default: Date.now
            }
        }],
        react: [mongoose.Schema.Types.ObjectId],
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("posts", posts);

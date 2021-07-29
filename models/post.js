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
        comments : {
            type: Array,
            default: [],
        },
        react: [mongoose.Schema.Types.ObjectId],
        comment: [{
            idUser: {
                type: mongoose.Schema.ObjectId,
            },
            content: String,
            createdAt: { 
                type: Date,
                default: Date.now 
            }
        }]
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("posts", posts);

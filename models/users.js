const mongoose = require("mongoose");
mongoose.set('useFindAndModify', false);

const users = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            maxLength: 1000,
        },
        phone: {
            type: String,
            minLength: 8,
            maxLength: 12,
        },
        image: {
            type: String,
            maxLength: 1000,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("users", users);

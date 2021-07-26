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
        status: {
            type: Number,
            min: -1,
            max: 2,
            default: 0,
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

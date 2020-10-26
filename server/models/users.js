const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    userId: {
        type: Number,
        required: true,
        unique: true
    },
    cart: {
        type: Array,
    },
    orders: {
        type: Array
    },
    city: {
        type: String
    },
    street: {
        type: String
    },
    uaserPassword: {
        type: String
    }
})

const UserModel = mongoose.model('user', UserSchema)

module.exports = UserModel;
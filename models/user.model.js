const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true,
        maxlength: 32
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        default: 'Male'
    },
    city: {
        type: String,
        required: true
    },
    payments: {
        type: Array,
        default: []
    },
    wishlist: {
        type: Array,
        default: []
    },
    agree: {
        type: Boolean
    },
    role: {
        type: String,
        default: "user"
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('user', userSchema)
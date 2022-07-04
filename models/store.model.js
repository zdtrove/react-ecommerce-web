const mongoose = require('mongoose')

const storeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 64
    },
    address: {
        type: String,
        required: true,
        trim: true,
        maxlength: 254
    },
    region: {
        type: String,
        required: true,
        trim: true,
        maxlength: 32
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('store', storeSchema)
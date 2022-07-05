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
    },
    map: {
        title: {
            type: String,
            default: ''
        },
        lat: {
            type: Number,
            default: 0
        },
        lng: {
            type: Number,
            default: 0
        }
    },
    openingHour: {
        type: String,
        default: ''
    },
    closingHour: {
        type: String,
        default: ''
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('store', storeSchema)
const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 64
    },
    enName: {
        type: String,
        required: true,
        trim: true,
        maxlength: 64
    },
    description: {
        type: String,
        maxlength: 1000
    },
    enDescription: {
        type: String,
        maxlength: 1000
    },
    startDate: {
        type: Date,
        default: ''
    },
    endDate: {
        type: Date,
        default: ''
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('event', eventSchema)
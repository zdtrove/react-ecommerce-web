const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add your category name"],
        trim: true,
        maxLength: [50, "Category name is up to 50 chars long"]
    },
    enName: {
        type: String,
        required: [true, "Please add your category english name"],
        trim: true,
        maxLength: [50, "Category name is up to 50 chars long"]
    },
    slug: {
        type: String,
        required: [true, "Category slug is required"],
        unique: true
    },
    icon: {
        type: String,
        default: ''
    },
    isMenu: {
        type: String,
        default: 'Yes'
    },
    type: {
        type: String
    },
    parentId: {
        type: String,
        default: ''
    },
    image: {
        type: String,
        default: ''
    }
}, { timestamps: true })

module.exports = mongoose.model('category', categorySchema)
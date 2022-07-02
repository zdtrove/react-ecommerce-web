const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add your product name"],
        trim: true,
        maxLength: [50, "Product name is up to 50 chars long"]
    },
    description: {
        type: String,
        maxLength: [1000, "Product description is up to 1000 chars long"]
    },
    price: {
        type: Number,
        trim: true,
        required: true,
    },
    slug: {
        type: String,
        required: [true, "Product slug is required"],
        unique: true
    },
    categoryId: {
        type: String,
        required: true,
    },
    images: {
        type: Array,
        default: []
    },
    sold: {
        type: Number,
        default: 0
    },
    star: {
        type: Number,
        default: 0
    }
}, { timestamps: true })

module.exports = mongoose.model('product', productSchema)
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
    shortDescription: {
        type: String,
        maxLength: [100, "Product short description is up to 100 chars long"]
    },
    gift: {
        text: {
            type: String,
            default: ''
        },
        price: {
            type: Number,
            default: 0
        }
    },
    price: {
        type: Number,
        trim: true,
        required: true,
    },
    salePrice: {
        type: Number,
        default: 0
    },
    isSale: {
        type: Boolean,
        default: false
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
        average: {
            type: Number,
            default: 0
        },
        list: [{
            userId: String,
            star: Number
        }]
    },
    configuration: {
        screen: {
            type: String,
            default: ''
        },
        os: {
            type: String,
            default: ''
        },
        camera: {
            rear: {
                type: String,
                default: ''
            },
            front: {
                type: String,
                default: ''
            }
        },
        cpu: {
            type: String,
            default: ''
        },
        ram: {
            type: String,
            default: ''
        },
        memory: {
            type: String,
            default: ''
        },
        sim: {
            type: String,
            default: ''
        },
        battery: {
            type: String,
            default: ''
        },
        resolution: {
            type: String,
            default: ''
        },
        dimensions: {
            type: String,
            default: ''
        },
        gps: {
            type: String,
            default: ''
        },
        bluetooth: {
            type: String,
            default: ''
        },
        wifi: {
            type: String,
            default: ''
        },
        hardDrive: {
            type: String,
            default: ''
        },
        graphic: {
            type: String,
            default: ''
        },
        connector: {
            type: String,
            default: ''
        },
        type: {
            type: String,
            default: ''
        },
        capacity: {
            type: String,
            default: ''
        },
        energySavingTechnology: {
            type: String,
            default: ''
        }
    },
    releaseDate: {
        type: String,
        default: ''
    },
    manufacture: {
        type: String,
        default: ''
    },
    eventIds: {
        type: Array,
        default: []
    },
    installment: {
        type: Boolean,
        default: false
    },
    new: {
        type: Boolean,
        default: false
    },
    storeIds: {
        type: Array,
        default: []
    }
}, { timestamps: true })

module.exports = mongoose.model('product', productSchema)
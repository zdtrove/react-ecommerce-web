const Product = require('../models/product.model')
const slugify = require('slugify')
const shortid = require('shortid')

exports.addProduct = async (req, res) => {
    try {
        const { name, images, description, price, categoryId } = req.body

        const productObj = {
            name,
            slug: slugify(`${name}-${shortid.generate()}`, { lower: true }),
            images,
            description,
            price,
            categoryId
        }

        const product = new Product(productObj)
        await product.save()

        res.status(201).json({
            message: "Create Product Success",
            product
        })
    } catch (err) {
        let errMsg
        if (err.code && err.code === 11000) {
            errMsg = `${Object.values(err.keyValue)[0]} product already exist`
        } else {
            errMsg = err.errors[Object.keys(err.errors)[0]].message
        }
        return res.status(500).json({ message: errMsg })
    }
}

exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find()

        return res.status(200).json({ products })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

exports.updateProduct = async (req, res) => {
    try {
        const { name, description, price, categoryId, images } = req.body
        const productUpdate = { name, description, price, categoryId };
        if (images.length > 0) {
            productUpdate.images = images;
        }

        const product = await Product.findOneAndUpdate({ _id: req.params.id }, productUpdate);
        const newProduct = { ...product._doc };

        res.status(200).json({
            message: "Update product success",
            product: newProduct
        })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findOneAndDelete({ _id: req.params.id })

		return res.status(200).json({ message: "Delete product success", product })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}
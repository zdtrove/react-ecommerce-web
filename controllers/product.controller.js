const Product = require('../models/product.model')
const slugify = require('slugify')
const shortid = require('shortid')
const APIfeatures = require('../utils/function');

exports.addProduct = async (req, res) => {
    try {
        const { name, enName, images, description, enDescription, shortDescription, enShortDescription, price, categoryId } = req.body

        const productObj = {
            name,
            enName,
            slug: slugify(`${name}-${shortid.generate()}`, { lower: true }),
            images,
            description,
            enDescription,
            shortDescription,
            enShortDescription,
            price,
            categoryId
        }

        const product = new Product(productObj)
        await product.save()

        res.status(201).json({
            message: "Add product success",
            data: product
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
        const features = new APIfeatures(Product.find(), req.query).filtering().sorting().paginating()
        const products = await features.query

        return res.status(200).json(products)
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message })
    }
}

exports.updateProduct = async (req, res) => {
    try {
        const { name, enName, description, enDescription, shortDescription, enShortDescription, price, categoryId, images } = req.body
        const productUpdate = { name, enName, description, enDescription, shortDescription, enShortDescription, price, categoryId };
        if (images.length > 0) {
            productUpdate.images = images;
        }

        const product = await Product.findOneAndUpdate({ _id: req.params.id }, productUpdate);

        res.status(200).json({
            message: "Update product success",
            product: { ...product._doc }
        })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

exports.ratingProduct = async (req, res) => {
    try {
        const { starNumber, userId, userName, date, message, images } = req.body
        const { star: { list }} = await Product.findOne({ _id: req.params.id });
        const listTemp = [...list];
        const index = listTemp.findIndex((item) => item.userId === userId);
        if (index >= 0) {
            listTemp[index].star = starNumber;
            listTemp[index].message = message;
            listTemp[index].date = date;
            listTemp[index].images = images;
        } else {
            listTemp.push({ userId, userName, date, star: starNumber, message, images });
        }
        const sum = listTemp.reduce((accumulator, object) => accumulator + object.star, 0);
        const average = (sum / listTemp.length) || 0;
        const product = await Product.findOneAndUpdate(
            { _id: req.params.id },
            { star: {
                average,
                list: [...listTemp]
            }},
            { new: true }
        );

        res.status(200).json({
            message: "Rating success",
            product: { ...product._doc }
        })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findOneAndDelete({ _id: req.params.id })

		return res.status(200).json({ message: "Delete product success", data: product })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}
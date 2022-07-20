const Category = require('../models/category.model')
const slugify = require('slugify')
const shortid = require('shortid')

const createCategories = (categories, parentId = null) => {
    const result = []
    let categoryList = parentId
        ? categories.filter(cat => cat.parentId == parentId)
        : categories.filter(cat => cat.parentId === '')

    for (let cat of categoryList) {
        result.push({
            _id: cat._id,
            name: cat.name,
            enName: cat.enName,
            slug: cat.slug,
            icon: cat.icon,
            isMenu: cat.isMenu,
            parentId: cat.parentId,
            image: cat.image ? cat.image : null,
            children: createCategories(categories, cat._id)
        })
    }

    return result
}

exports.addCategory = async (req, res) => {
    try {
        const { name, enName, icon, isMenu, parentId, image } = req.body

        const categoryObj = { name, enName, icon, isMenu, slug: slugify(`${name}-${shortid.generate()}`, { lower: true }), image }
        if (parentId) categoryObj.parentId = parentId

        const category = new Category(categoryObj)
        await category.save()

        res.status(201).json({
            message: "Add category Success",
            data: category
        })
    } catch (err) {
        let errMsg
        if (err.code && err.code === 11000) {
            errMsg = `${Object.values(err.keyValue)[0]} category already exist`
        } else {
            errMsg = err.errors[Object.keys(err.errors)[0]].message
        }
        return res.status(500).json({ message: errMsg })
    }
}

exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.find()

        return res.status(200).json(createCategories(categories))
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

exports.updateCategory = async (req, res) => {
    try {
        const { name, enName, icon, isMenu, parentId, image } = req.body
        const category = await Category.findOneAndUpdate({ _id: req.params.id }, {
            name, enName, icon, isMenu, parentId, image
        });

        res.status(200).json({
            message: "Update category success",
            data: { ...category._doc }
        })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

exports.deleteCategory = async (req, res) => {
    try {
        const category = await Category.findOneAndDelete({ _id: req.params.id })

		return res.status(200).json({ message: "Delete category success", data: category })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}
const User = require('../models/user.model')
const Product = require('../models/product.model')
const Category = require('../models/category.model')
const Event = require('../models/event.model')
const Store = require('../models/store.model')

exports.getDashboard = async (req, res) => {
	try {
        const users = await User.find({}).select("-password").limit(5);
        const categories = await Category.find({}).limit(5);
        const products = await Product.find({}).limit(5);
        const events = await Event.find({}).limit(5);
        const stores = await Store.find({}).limit(5);

        return res.status(200).json({
            users,
            categories,
            products,
            events,
            stores
        })
	} catch (err) {
		return res.status(500).json({ message: err.message })
	}
}
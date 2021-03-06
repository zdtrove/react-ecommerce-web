const Store = require('../models/store.model')

exports.getStores = async (req, res) => {
	try {
		const stores = await Store.find({})

		return res.status(200).json(stores)
	} catch (err) {
		return res.status(500).json({ message: err.message })
	}
}

exports.addStore = async (req, res) => {
	try {
		const { name, enName, address, enAddress, region, enRegion } = req.body

        const newStore = new Store({
            name, enName, address, enAddress, region, enRegion
        })

        await newStore.save((err, data) => {
            if (err) res.status(400).json(err)
            if (data) res.status(201).json({
                message: "Add store success",
                data
            })
        })
	} catch (err) {
		return res.status(500).json({ message: err.message })
	}
}

exports.updateStore = async (req, res) => {
	try {
		const { name, enName, address, enAddress, region, enRegion } = req.body
		const store = await Store.findOneAndUpdate({ _id: req.params.id }, {
			name, enName, address, enAddress, region, enRegion
		})

		res.status(200).json({
			message: "Update store success",
			store: { ...store._doc }
		})
	} catch (err) {
		return res.status(500).json({ message: err.message })
	}
}

exports.deleteStore = async (req, res) => {
	try {
		const store = await Store.findOneAndDelete({ _id: req.params.id })

		return res.status(200).json({ message: "Delete store success", data: store })
	} catch (err) {
		return res.status(500).json({ message: err.message })
	}
}
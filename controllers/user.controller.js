const User = require('../models/user.model')

exports.getUsers = async (req, res) => {
	try {
		const users = await User.find({}).select("-password")

		return res.status(200).json({ users })
	} catch (err) {
		return res.status(500).json({ message: err.message })
	}
}

exports.updateUser = async (req, res) => {
	try {
		const { fullname, phone, gender, city, payments } = req.body
		const user = await User.findOneAndUpdate({ _id: req.params.id }, {
			fullname, phone, gender, city, payments
		})

		const newUser = { ...user._doc, password: "", fullname, phone, gender, city, payments }
		delete newUser.password
		res.status(200).json({
			message: "Update user success",
			newUser
		})
	} catch (err) {
		return res.status(500).json({ message: err.message })
	}
}

exports.deleteUser = async (req, res) => {
	try {
		const user = await User.findOneAndDelete({ _id: req.params.id })

		return res.status(200).json({ message: "Delete user success", userDelete: user })
	} catch (err) {
		return res.status(500).json({ message: err.message })
	}
}
const User = require('../models/user.model')

exports.getUsers = async (req, res) => {
	try {
		const users = await User.find({}).select("-password")

		return res.status(200).json({ users })
	} catch (err) {
		return res.status(500).json({ message: err.message })
	}
}
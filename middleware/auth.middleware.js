const User = require('../models/user.model')
const jwt = require('jsonwebtoken')

exports.auth = async (req, res, next) => {
	try {
		const token = req.header("Authorization").split(" ")[1]
		if (!token) return res.status(400).json({ message: "Invalid Authentication 1" })

		const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
		if (!decoded) return res.status(400).json({ message: "Invalid Authentication 2" })

		const user = await User.findOne({ _id: decoded.id })
		req.user = user

		next()
	} catch (err) {
		return res.status(500).json({ ...err })
	}
}

exports.onlyUser = (req, res, next) => {
    try {
		if (req.user.role !== 'user') {
			return res.status(400).json({ message: 'Only user can access this data' })
		}
		next()
	} catch (err) {
		return res.status(500).json({ ...err })
	}
}

exports.onlyAdmin = (req, res, next) => {
    try {
		if (req.user.role !== 'admin') {
			return res.status(400).json({ message: 'Only admin can access this data' })
		}
		next()
	} catch (err) {
		return res.status(500).json({ ...err })
	}
}
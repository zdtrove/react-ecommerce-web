const User = require('../models/user.model')
const jwt = require('jsonwebtoken')

exports.auth = async (req, res, next) => {
	try {
		let token
		if (req.header('Authorization')) {
			token = req.header('Authorization').split(" ")[1]
		}

		if (req.header('AuthorizationAdmin')) {
			token = req.header('AuthorizationAdmin').split(" ")[1]
		}

		if (!token) return res.status(400).json({ message: "Invalid Authentication user 1"})

		const decoded = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
		if (!decoded) return res.status(400).json({ message: "Invalid Authentication user 2"})

		const user = await User.findOne({ _id: decoded.id })
		req.user = user

		next()
	} catch (err) {
		console.log(err)
		res.status(500).json({ ...err, role: 'user' })
	}
}

exports.authAdmin = async (req, res, next) => {
	try {
		const token = req.header("AuthorizationAdmin").split(" ")[1]
		if (!token) return res.status(400).json({ message: "Invalid Authentication admin 1" })

		const decoded = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
		if (!decoded) return res.status(400).json({ message: "Invalid Authentication admin 2" })
		if (decoded.role !== 'admin') return res.status(400).json({ message: "Only Admin User Can Access" })

		const user = await User.findOne({ _id: decoded.id })
		req.user = user

		next()
	} catch (err) {
		console.log(err)
		return res.status(500).json({ ...err, role: 'admin' })
	}
}
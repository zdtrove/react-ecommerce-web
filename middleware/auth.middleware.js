const User = require('../models/user.model')
const jwt = require('jsonwebtoken')

exports.auth = async (req, res, next) => {
	try {
		const token = req.header('Authorization').split(" ")[1]
		if (!token) return res.status(400).json({ message: "Invalid Authentication"})

		const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
		if (!decoded) return res.status(400).json({ message: "Invalid Authentication"})

		const user = await User.findOne({ _id: decoded.id })
		req.user = user

		next()
	} catch (err) {
		res.status(500).json({ message: err.message  })
	}
}

exports.authAdmin = async (req, res, next) => {
	try {
		console.log(req.header("Authorization"))
		const token = req.header("Authorization").split(" ")[1]
		if (!token) return res.status(400).json({ message: "Invalid Authentication" })

		const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
		if (!decoded) return res.status(400).json({ message: "Invalid Authentication" })

		const user = await User.findOne({ _id: decoded.id })
		req.user = user

		next()
	} catch (err) {
		console.log(err)
		return res.status(500).json({ message: err.message })
	}
}
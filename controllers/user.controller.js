const User = require('../models/user.model')
const bcrypt = require('bcrypt')

exports.getUsers = async (req, res) => {
	try {
		const users = await User.find({}).select("-password")

		return res.status(200).json({ users })
	} catch (err) {
		return res.status(500).json({ message: err.message })
	}
}

exports.addUser = async (req, res) => {
	try {
		const { fullname, email, phone, gender, city, payments, password } = req.body

        const emailExist = await User.findOne({ email })
        if (emailExist) return res.status(400).json({ message: "Email already exists"})

        const passwordHash = await bcrypt.hash(password, 12)

        const newUser = new User({
            fullname, email, phone, gender, city, payments, password: passwordHash
        })

        await newUser.save((err, data) => {
            if (err) res.status(400).json(err)
            if (data) res.status(201).json({
                message: "Add new user success",
                newUser: data
            })
        })
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

		const newUser = { ...user._doc, fullname, phone, gender, city, payments }
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
const User = require('../models/user.model')
const bcrypt = require('bcrypt')

exports.getUsers = async (req, res) => {
	try {
		const users = await User.find({}).select("-password")

		return res.status(200).json(users)
	} catch (err) {
		return res.status(500).json({ message: err.message })
	}
}

exports.addUser = async (req, res) => {
	try {
		const { fullName, email, phone, gender, city, payments, password, role } = req.body

        const emailExist = await User.findOne({ email })
        if (emailExist) return res.status(400).json({ message: "Email already exists"})

        const passwordHash = await bcrypt.hash(password, 12)

        const newUser = new User({
            fullName, email, phone, gender, city, payments, password: passwordHash, role
        })

        await newUser.save((err, data) => {
            if (err) res.status(400).json(err)
            if (data) res.status(201).json({
                message: "Add user success",
                data
            })
        })
	} catch (err) {
		return res.status(500).json({ message: err.message })
	}
}

exports.updateUser = async (req, res) => {
	try {
		const { fullName, phone, gender, city, payments, role } = req.body
		const user = await User.findOneAndUpdate({ _id: req.params.id }, {
			fullName, phone, gender, city, payments, role
		})

		const newUser = { ...user._doc }
		delete newUser.password

		res.status(200).json({
			message: "Update user success",
			data: newUser
		})
	} catch (err) {
		return res.status(500).json({ message: err.message })
	}
}

exports.deleteUser = async (req, res) => {
	try {
		const user = await User.findOneAndDelete({ _id: req.params.id })

		return res.status(200).json({ message: "Delete user success", data: user })
	} catch (err) {
		return res.status(500).json({ message: err.message })
	}
}
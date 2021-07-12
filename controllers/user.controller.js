const User = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const createAccessToken = payload => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h'})
}

const createRefreshToken = payload => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' })
}

exports.register = async (req, res) => {
    const { fullname, email, phone, gender, city, payments, password, agree } = req.body

    const emailExist = await User.findOne({ email })
    if (emailExist) return res.status(400).json({ message: "Email already exists"})

    const passwordHash = await bcrypt.hash(password, 12)

    const newUser = new User({
        fullname, email, phone, gender, city, payments, password: passwordHash, agree
    })

    const accessToken = createAccessToken({ id: newUser._id })
    const refreshToken = createRefreshToken({ id: newUser._id })

    res.cookie('refresh_token', refreshToken, {
        httpOnly: true,
        path: '/api/refresh_token',
        maxAge: 24 * 60 * 60 * 1000 // 1 days
    })

    await newUser.save((err, data) => {
        if (err) res.status(400).json(err)
        if (data) res.status(201).json({
            message: "Register Success",
            accessToken,
            user: data
        })
    })
}

exports.login = async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user) return res.status(400).json({ message: "User does not exist"})

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(400).json({ message: "Password incorrect"})

    const accessToken = createAccessToken({ id: user._id })
    const refreshToken = createRefreshToken({ id: user._id })

    res.cookie('refresh_token', refreshToken, {
        httpOnly: true,
        path: '/api/refresh_token',
        maxAge: 24 * 60 * 60 * 1000 // 1 days
    })

    res.status(200).json({
        message: "Login success",
        accessToken,
        user: {
            ...user._doc,
            password: ''
        }
    })
}
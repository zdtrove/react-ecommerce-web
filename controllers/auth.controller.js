const User = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const createAccessToken = payload => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '2h'})
    // return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30s'})
}

const createRefreshToken = payload => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '2d' })
    // return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' })
    // return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '60s' })
}

exports.register = async (req, res) => {
    try {
        const { fullName, email, phone, gender, city, payments, password, agree } = req.body

        const emailExist = await User.findOne({ email })
        if (emailExist) return res.status(400).json({ message: "Email already exists"})

        const passwordHash = await bcrypt.hash(password, 12)

        const newUser = new User({
            fullName, email, phone, gender, city, payments, password: passwordHash, agree
        })

        await newUser.save((err, data) => {
            if (err) res.status(400).json(err)
            if (data) res.status(201).json({
                message: "Register Success",
                user: data
            })
        })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await User.findOne({ email })
        if (!user) return res.status(400).json({ message: "User does not exist"})

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) return res.status(400).json({ message: "Password incorrect"})

        const accessToken = createAccessToken({ id: user._id, role: user.role })
        const refreshToken = createRefreshToken({ id: user._id, role: user.role })

        const cookiePath = 'refresh_token'

        res.cookie(cookiePath, refreshToken, {
            httpOnly: true,
            path: `/api/auth/${cookiePath}`,
            maxAge: 48 * 60 * 60 * 1000 // 2 days
            // maxAge: 24 * 60 * 60 * 1000 // 1 days
            // maxAge: 30 * 1000 // 60 secons
        })

        res.status(200).json({
            message: "Login success",
            accessToken,
            user: {
                ...user._doc,
                password: ''
            }
        })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

exports.logout = async (req, res) => {
    try {
        const cookiePath = 'refresh_token'
        res.clearCookie(cookiePath, { path: `/api/auth/${cookiePath}`})

        return res.status(200).json({ message: "Logout success" })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

exports.getLoggedUser = async (req, res) => {
    try {
        const { accessToken } = req.body
        let user
        if (accessToken) {
            let verify = jwt.verify(accessToken.split(" ")[1], process.env.ACCESS_TOKEN_SECRET)
            if (!verify) {
                return res.status(400).json({ message: 'Invalid token' })
            }
            user = await User.findById(verify.id).select("-password")
        }
        res.status(200).json({ user })
    } catch (err) {
        return res.status(500).json({ ...err })
    }
}

exports.generateAccessToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.refresh_token
        let verify = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
        if (!verify) {
            return res.status(400).json({ message: "Invalid token", role: req.body.role })
        }
        const { id, role } = verify
        const user = await User.findById(id).select("-password")
        const accessToken = createAccessToken({ id, role })
        
        res.status(200).json({
            accessToken,
            user
        })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}
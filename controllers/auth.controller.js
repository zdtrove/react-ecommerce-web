const User = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const createAccessToken = payload => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '2h'})
}

const createRefreshToken = payload => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' })
}

exports.register = async (req, res) => {
    try {
        const { fullname, email, phone, gender, city, payments, password, agree } = req.body

        const emailExist = await User.findOne({ email })
        if (emailExist) return res.status(400).json({ message: "Email already exists"})

        const passwordHash = await bcrypt.hash(password, 12)

        const newUser = new User({
            fullname, email, phone, gender, city, payments, password: passwordHash, agree
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
        const { email, password, role } = req.body

        const user = await User.findOne({ email, role })
        if (!user) return res.status(400).json({ message: "User does not exist"})

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) return res.status(400).json({ message: "Password incorrect"})

        const accessToken = createAccessToken({ id: user._id, role: user.role })
        const refreshToken = createRefreshToken({ id: user._id, role: user.role })

        const cookiePath = user.role === 'user' ? 'refresh_token' : 'refresh_token_admin'

        res.cookie(cookiePath, refreshToken, {
            httpOnly: true,
            path: `/api/auth/${cookiePath}`,
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
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

exports.logout = async (req, res) => {
    try {
        const cookiePath = req.body.role === 'user' ? 'refresh_token' : 'refresh_token_admin'
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
            await jwt.verify(accessToken.split(" ")[1], process.env.ACCESS_TOKEN_SECRET, async (err, result) => {
                if (err) return res.status(400).json({ ...err, role: "user" })
                const { id, role } = result
                user = await User.findById(id).select("-password")
            })
        }

        res.status(200).json({ user })
    } catch (err) {
        return res.status(500).json({ err })
    }
}

exports.getLoggedUserAdmin = async (req, res) => {
    try {
        const { accessTokenAdmin } = req.body
        let user
        
        if (accessTokenAdmin) {
            await jwt.verify(accessTokenAdmin.split(" ")[1], process.env.ACCESS_TOKEN_SECRET, async (err, result) => {
                if (err) return res.status(400).json({ ...err, role: "admin" })
                const { id, role } = result
                user = await User.findById(id).select("-password")
            })
        }

        res.status(200).json({ user })
    } catch (err) {
        return res.status(500).json({ err })
    }
}

exports.generateAccessToken = async (req, res) => {
    try {
        const refreshToken = req.body.role === 'user' ? req.cookies.refresh_token : req.cookies.refresh_token_admin
        if (!refreshToken) return res.status(400).json({ message: "Please login now" })
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, result) => {
            if (err) return res.status(400).json(err)
            const { id, role } = result
            const user = await User.findById(id).select("-password")
            const accessToken = createAccessToken({ id, role })
            
            res.status(200).json({
                accessToken,
                user
            })
        })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}
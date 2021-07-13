const router = require('express').Router()
const { register, login, logout, generateAccessToken } = require('../controllers/user.controller')

router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout)
router.post('/refresh_token', generateAccessToken)
router.post('/refresh_token_admin', generateAccessToken)

module.exports = router
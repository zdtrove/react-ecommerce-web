const router = require('express').Router()
const { register, login, logout, generateAccessToken } = require('../controllers/auth.controller')

router.post('/auth/register', register)
router.post('/auth/login', login)
router.post('/auth/logout', logout)
router.post('/auth/refresh_token', generateAccessToken)
router.post('/auth/refresh_token_admin', generateAccessToken)

module.exports = router
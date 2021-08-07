const router = require('express').Router()
const { register, login, logout, generateAccessToken, getLoggedUser } = require('../controllers/auth.controller')

router.post('/auth/register', register)
router.post('/auth/login', login)
router.post('/auth/logout', logout)
router.post('/auth/refresh_token', generateAccessToken)
router.post('/auth/get_logged_user', getLoggedUser)

module.exports = router
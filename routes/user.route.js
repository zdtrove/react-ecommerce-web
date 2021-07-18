const router = require('express').Router()
const { auth } = require('../middleware/auth.middleware')
const { getUsers } = require('../controllers/user.controller')

router.route('/user')
	.get(auth, getUsers)

module.exports = router
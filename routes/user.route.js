const router = require('express').Router()
const { auth, authAdmin } = require('../middleware/auth.middleware')
const { getUsers, updateUser, deleteUser, addUser } = require('../controllers/user.controller')

router.route('/users')
	.get(auth, getUsers)
	.post(auth, addUser)

router.route('/user/:id')
	.patch(auth, updateUser)
	.delete(auth, deleteUser)

module.exports = router
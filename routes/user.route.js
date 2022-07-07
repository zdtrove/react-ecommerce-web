const router = require('express').Router()
const { auth, onlyAdmin } = require('../middleware/auth.middleware')
const { getUsers, updateUser, deleteUser, addUser } = require('../controllers/user.controller')

router.route('/users')
	.get(auth, onlyAdmin, getUsers)
	.post(auth, onlyAdmin, addUser)

router.route('/user/:id')
	.patch(auth, updateUser)
	.delete(auth, deleteUser)

module.exports = router
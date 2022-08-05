const router = require('express').Router()
const { auth, onlyAdmin } = require('../middleware/auth.middleware')
const { getUsers, updateUser, deleteUser, addUser, addWishlist, removeWishlist } = require('../controllers/user.controller')

router.route('/users')
	.get(auth, onlyAdmin, getUsers)
	.post(auth, onlyAdmin, addUser)

router.route('/user/:id')
	.patch(auth, updateUser)
	.delete(auth, deleteUser)

router.route('/user/:id/add-wishlist')
	.patch(auth, addWishlist)

	router.route('/user/:id/remove-wishlist')
	.patch(auth, removeWishlist)

module.exports = router
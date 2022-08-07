const router = require('express').Router()
const { addProduct, getProducts, updateProduct, deleteProduct, ratingProduct } = require('../controllers/product.controller')
const { auth, onlyAdmin } = require('../middleware/auth.middleware')

router.route('/products')
    .get(getProducts)
    .post(auth, onlyAdmin, addProduct)

router.route('/product/:id')
    .patch(auth, onlyAdmin, updateProduct)
    .delete(auth, onlyAdmin, deleteProduct)

router.route('/product/:id/rating')
	.patch(auth, ratingProduct)

module.exports = router
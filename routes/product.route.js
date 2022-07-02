const router = require('express').Router()
const { addProduct, getProducts, updateProduct, deleteProduct } = require('../controllers/product.controller')
const { auth, onlyAdmin } = require('../middleware/auth.middleware')

router.route('/products')
    .get(auth, onlyAdmin, getProducts)
    .post(auth, onlyAdmin, addProduct)

router.route('/product/:id')
    .patch(auth, onlyAdmin, updateProduct)
    .delete(auth, onlyAdmin, deleteProduct)

module.exports = router
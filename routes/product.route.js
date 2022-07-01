const router = require('express').Router()
const { addProduct, getProducts } = require('../controllers/product.controller')
const { auth, onlyAdmin } = require('../middleware/auth.middleware')

router.route('/products')
    .get(auth, onlyAdmin, getProducts)
    .post(auth, onlyAdmin, addProduct)

module.exports = router
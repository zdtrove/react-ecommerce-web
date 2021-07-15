const router = require('express').Router()
const { addCategory, getCategories } = require('../controllers/category.controller')
const { authAdmin } = require('../middleware/auth.middleware')

router.route('/category')
    .get(authAdmin, getCategories)
    .post(authAdmin, addCategory)

module.exports = router
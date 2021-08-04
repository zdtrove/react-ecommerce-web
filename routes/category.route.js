const router = require('express').Router()
const { addCategory, getCategories, updateCategory, deleteCategory } = require('../controllers/category.controller')
const { authAdmin } = require('../middleware/auth.middleware')

router.route('/categories')
    .get(authAdmin, getCategories)
    .post(authAdmin, addCategory)

router.route('/category/:id')
    .patch(authAdmin, updateCategory)
    .delete(authAdmin, deleteCategory)

module.exports = router
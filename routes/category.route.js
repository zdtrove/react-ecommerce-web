const router = require('express').Router()
const { addCategory, getCategories, updateCategory, deleteCategory } = require('../controllers/category.controller')
const { auth, onlyAdmin } = require('../middleware/auth.middleware')

router.route('/categories')
    .get(auth, getCategories)
    .post(auth, onlyAdmin, addCategory)

router.route('/category/:id')
    .patch(auth, updateCategory)
    .delete(auth, deleteCategory)

module.exports = router
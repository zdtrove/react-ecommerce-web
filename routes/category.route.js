const router = require('express').Router()
const { addCategory, getCategories, updateCategory, deleteCategory } = require('../controllers/category.controller')
const { auth, onlyAdmin } = require('../middleware/auth.middleware')

router.route('/categories')
    .get(auth, onlyAdmin, getCategories)
    .post(auth, onlyAdmin, addCategory)

router.route('/category/:id')
    .patch(auth, onlyAdmin, updateCategory)
    .delete(auth, onlyAdmin, deleteCategory)

module.exports = router
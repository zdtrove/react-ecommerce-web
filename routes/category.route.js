const router = require('express').Router()
const { addCategory, getCategories } = require('../controllers/category.controller')

router.route('/category')
    .get(getCategories)
    .post(addCategory)

module.exports = router
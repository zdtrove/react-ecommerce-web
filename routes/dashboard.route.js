const router = require('express').Router()
const { getDashboard } = require('../controllers/dashboard.controller')
const { auth, onlyAdmin } = require('../middleware/auth.middleware')

router.route('/dashboard')
    .get(auth, onlyAdmin, getDashboard)

module.exports = router
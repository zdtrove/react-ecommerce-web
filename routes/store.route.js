const router = require('express').Router()
const { addStore, getStores } = require('../controllers/store.controller')
const { auth, onlyAdmin } = require('../middleware/auth.middleware')

router.route('/stores')
    .get(auth, onlyAdmin, getStores)
    .post(auth, onlyAdmin, addStore)

module.exports = router
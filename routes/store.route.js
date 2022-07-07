const router = require('express').Router()
const { addStore, getStores, updateStore, deleteStore } = require('../controllers/store.controller')
const { auth, onlyAdmin } = require('../middleware/auth.middleware')

router.route('/stores')
    .get(auth, getStores)
    .post(auth, onlyAdmin, addStore)

router.route('/store/:id')
    .patch(auth, onlyAdmin, updateStore)
    .delete(auth, onlyAdmin, deleteStore)

module.exports = router
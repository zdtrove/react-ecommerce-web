const router = require('express').Router()
const { addEvent, getEvents } = require('../controllers/event.controller')
const { auth, onlyAdmin } = require('../middleware/auth.middleware')

router.route('/events')
    .get(auth, onlyAdmin, getEvents)
    .post(auth, onlyAdmin, addEvent)

module.exports = router
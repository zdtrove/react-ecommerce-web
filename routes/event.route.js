const router = require('express').Router()
const { addEvent, getEvents, updateEvent, deleteEvent } = require('../controllers/event.controller')
const { auth, onlyAdmin } = require('../middleware/auth.middleware')

router.route('/events')
    .get(auth, onlyAdmin, getEvents)
    .post(auth, onlyAdmin, addEvent)

router.route('/event/:id')
    .patch(auth, onlyAdmin, updateEvent)
    .delete(auth, onlyAdmin, deleteEvent)

module.exports = router
const Event = require('../models/event.model')

exports.getEvents = async (req, res) => {
	try {
		const events = await Event.find({})

		return res.status(200).json({ events })
	} catch (err) {
		return res.status(500).json({ message: err.message })
	}
}

exports.addEvent = async (req, res) => {
	try {
		const { name, description, startDate, endDate } = req.body

        const newEvent = new Event({
            name, description, startDate, endDate
        })

        await newEvent.save((err, data) => {
            if (err) res.status(400).json(err)
            if (data) res.status(201).json({
                message: "Add new event success",
                event: data
            })
        })
	} catch (err) {
		return res.status(500).json({ message: err.message })
	}
}
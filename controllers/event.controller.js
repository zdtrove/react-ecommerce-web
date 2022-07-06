const Event = require('../models/event.model')

exports.getEvents = async (req, res) => {
	try {
		const events = await Event.find({})

		return res.status(200).json(events)
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
                message: "Add event success",
                data
            })
        })
	} catch (err) {
		return res.status(500).json({ message: err.message })
	}
}

exports.updateEvent = async (req, res) => {
	try {
		const { name, description, startDate, endDate } = req.body
		const event = await Event.findOneAndUpdate({ _id: req.params.id }, {
			name, description, startDate, endDate
		})

		res.status(200).json({
			message: "Update event success",
			data: { ...event._doc }
		})
	} catch (err) {
		return res.status(500).json({ message: err.message })
	}
}

exports.deleteEvent = async (req, res) => {
	try {
		const event = await Event.findOneAndDelete({ _id: req.params.id })

		return res.status(200).json({ message: "Delete event success", data: event })
	} catch (err) {
		return res.status(500).json({ message: err.message })
	}
}
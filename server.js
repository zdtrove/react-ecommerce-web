require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')

const app = express()
app.use(express.json())
app.use(cors())
app.use(cookieParser())

mongoose.connect(process.env.MONGODB_URL, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => {
    if (err) throw err
    console.log("Connected to MongoDB")
})

app.use('/api', require('./routes/auth.route'))
app.use('/api', require('./routes/category.route'))
app.use('/api', require('./routes/product.route'))
app.use('/api', require('./routes/user.route'))
app.use('/api', require('./routes/store.route'))
app.use('/api', require('./routes/event.route'))
app.use('/api', require('./routes/dashboard.route'))

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'))
	app.get('*', (req, res) => {
		res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
	})
}

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

// Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYmQ2Yzc1OTFkNDg1MmQxNDNkYzhiMiIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY1Nzc2MzM4OCwiZXhwIjoxNjU3NzcwNTg4fQ.zUCbVO4XYrr10GDImOl9co2TD4MHTWBv5fJlHOXLliE
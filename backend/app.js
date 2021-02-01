const express = require('express')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const cors = require('cors')
require('dotenv').config()

const usersRouter = require('./routes/users')
const lunchWeekRouter = require('./routes/lunchWeek')

const app = express()

app.use(cors())
app.options('*', cors())

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

const router = express.Router()

router.use('/users', usersRouter)
router.use('/lunchweek', lunchWeekRouter)
app.use('/api', router)

module.exports = app

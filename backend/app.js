require('dotenv').config()

const cookieParser = require('cookie-parser')
const cors = require('cors')
const express = require('express')
const logger = require('morgan')
const path = require('path')

const authenticateJwt = require('./authenticate-jwt')
const usersRouter = require('./routes/users')
const lunchWeekRouter = require('./routes/lunchWeek')

const app = express()

app.use(cors())
app.options('*', cors())

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

const router = express.Router()

// router.use('/', indexRouter)
router.use('/users', usersRouter)
router.use('/lunch-week', authenticateJwt, lunchWeekRouter)
app.use('/api', router)

module.exports = app

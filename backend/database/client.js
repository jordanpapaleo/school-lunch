const knex = require('knex')
const knexStringcase = require('knex-stringcase')

const environment = process.env.ENVIRONMENT || 'development'
const config = require('../knexfile.js')[environment]
const options = knexStringcase(config)
const db = knex(options)

module.exports = db

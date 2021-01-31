const express = require('express')
const router = express.Router()

/* GET users listing. */
router.get('/', function(req, res, next) {
  const user = {
    id: 1,
    name: 'John Doe',
    emailAddress: 'john@test.com',
  }
  res.send(user)
})

module.exports = router

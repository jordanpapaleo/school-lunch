const express = require('express')
const router = express.Router()

const lunchWeekList = [
  {
    lunchWeekId: 1,
    weekOf: '2020-10-05',
    isPublished: true,
  },
  {
    lunchWeekId: 2,
    weekOf: '2020-10-12',
    isPublished: true,
  },
  {
    lunchWeekId: 3,
    weekOf: '2020-10-19',
    isPublished: false,
  },
]

router.get('/', function(req, res) {
  res.send(lunchWeekList)
})

router.get('/:id', function(req, res) {
  const id = parseInt(req.params.id)
  const lunchWeek = lunchWeekList.find((x) => x.lunchWeekId === id)

  if (lunchWeek) {
    res.send(lunchWeek)
  } else {
    res.status(404).send()
  }
})

module.exports = router

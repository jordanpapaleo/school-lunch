const express = require('express')
const router = express.Router()

const lunchWeekList = [
  {
    id: 1,
    weekOf: '2020-10-05',
    isPublished: true,
  },
  {
    id: 2,
    weekOf: '2020-10-12',
    isPublished: true,
  },
  {
    id: 3,
    weekOf: '2020-10-19',
    isPublished: false,
  },
]

router.get('/', function(req, res) {
  res.send(lunchWeekList)
})

router.get('/:id', function(req, res) {
  const id = parseInt(req.params.id)
  const lunchWeek = lunchWeekList.find((x) => x.id === id)

  if (lunchWeek) {
    res.send(lunchWeek)
  } else {
    res.status(404).send()
  }
})

module.exports = router

/*
type LunchWeekT = {
  lunchDayId: Number  //  The primary key of the lunch day entity
  lunchWeekId: Number  // Foreign key to the parent lunch week entity
  day: Date  // The date of the given lunch day
  menuDetails: string  // The details of the daily lunch menu
}

type LunchWeekT = {
  lunchWeekId: Number, //  The primary key of the lunch week entity(more on this later)
  weekOf: Date, // The start date of the school week, e.g. 2020 - 01 - 01
  isPublished: Boolean, //  Whether or not the week is published for public users to see
  lunchDays: LunchWeekT[], // A list of child lunchDay objects
}

{
 lunchWeek: {
   lunchWeekId: 1,
   weekOf: '2020-10-05',
   isPublished: false,
   lunchDays: [
     {
       lunchDayId: 1,
       lunchWeekId: 1,
       day: '2020-10-05',
       menuDetails: 'Beef tacos or cheese quesadillas with apple slices, rice and black beans'
     },
     {
       lunchDayId: 2,
       lunchWeekId: 1,
       day: '2020-10-06',
       menuDetails: 'Cheese or pepperoni pizza with grapes and celery sticks'
     }
   ]
 }
}

*/

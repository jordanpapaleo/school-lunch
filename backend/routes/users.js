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

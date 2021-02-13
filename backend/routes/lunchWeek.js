const express = require('express')
const router = express.Router()
const knex = require('../database/client')

// Create a helper function to select all the rows from the
// lunch_week table
const getLunchWeekList = () => {
  return knex.select().from('lunch_week').orderBy('week_of')
}

const getLunchWeekById = (id) => {
  return knex.select().from('lunch_week').where('lunch_week_id', id).first()
}

const createLunchWeek = (newLunchWeek) => {
  return knex('lunch_week').insert(newLunchWeek).returning('lunch_week_id')
}

const updateLunchWeek = (id, update) => {
  return knex('lunch_week').where('lunch_week_id', id).update(update)
}

const deleteLunchWeek = (lunchWeekId) => {
  return knex('lunch_week').where('lunch_week_id', lunchWeekId).del()
}

// create a new lunchDay
const createLunchDay = (lunchDay) => {
  return knex('lunch_day').insert(lunchDay).returning('lunch_day_id')
}

// update an existing lunch day
const updateLunchDay = (lunchDayId, lunchDay) => {
  return knex('lunch_day').where('lunch_day_id', lunchDayId).update(lunchDay)
}

router.get('/', async (req, res) => {
  try {
    const lunchWeekList = await getLunchWeekList()
    res.send(lunchWeekList)
  } catch (err) {
    console.log(err)
    res
      .status(500)
      .send({
        message: 'Error getting Lunch Week List',
        error: err.toString(),
      })
  }
})

router.get('/:id', async (req, res) => {
  const id = parseInt(req.params.id)

  try {
    const newLunchWeek = await getLunchWeekById(id)
    if (newLunchWeek) {
      res.send(newLunchWeek)
    } else {
      res
        .status(404)
        .send({
          message: `Lunch week id ${id} not found`,
        })
    }
  } catch (err) {
    console.log(err)
    res
      .status(500)
      .send({
        message: `Error getting lunch week id ${id}`,
        error: err.toString(),
        params: req.params,
      })
  }
})

router.post('/', async (req, res) => {
  const newLunchWeek = req.body
  /*
    {
     "isPublished": false,
     "weekOf": "2020-11-07"
    }
  */

  try {
    const errors = []

    if (newLunchWeek.isPublished === undefined || typeof newLunchWeek.isPublished !== 'boolean') {
      errors.push('isPublished is a required boolean')
    }

    if (newLunchWeek.weekOf === undefined || typeof newLunchWeek.weekOf !== 'string') {
      errors.push('weekOf is a required string')
    }

    if (errors.length) {
      res
        .status(422)
        .send({ message: 'Missing or invalid data', error: errors.join(', ') })
      return
    }

    const insertResponse = await createLunchWeek(newLunchWeek)
    // Since you can insert more than one row with `knex.insert`, the response is
    // an array, so we need to return the 0 position
    const lunchWeek = await getLunchWeekById(insertResponse[0])
    res.send(lunchWeek)
  } catch (err) {
    console.log(err)
    const message = 'Error creating Lunch Week'
    res
      .status(500)
      .send({ message: message, error: err.toString() })
  }
})

router.put('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const update = req.body
    const lunchWeekUpdateId = await updateLunchWeek(id, update)
    const updatedLunchWeek = await getLunchWeekById(lunchWeekUpdateId)

    res.send(updatedLunchWeek)
  } catch (err) {
    console.log(err)
    const message = 'Error updating Lunch Week'
    res
      .status(500)
      .send({ message: message, error: err.toString() })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    await deleteLunchWeek(id)
    res.send()
  } catch (e) {
    const message = 'Error deleting Lunch Week'
    res
      .status(500)
      .send({ message: message, error: e.toString() })
  }
})

router.post('/:lunchWeekId/lunch-day', async function(req, res) {
  const lunchDay = req.body
  try {
    const insertResponse = await createLunchDay({
      ...lunchDay,
      lunch_week_id: parseInt(req.params.lunchWeekId),
    })

    res.send({ lunchDayId: insertResponse[0] })
  } catch (e) {
    const message = 'Error creating Lunch Day'
    res.status(500).send({ message: message, error: e.toString() })
  }
})

router.put('/:lunchWeekId/lunch-day/:lunchDayId', async function(req, res) {
  try {
    const lunchDayId = parseInt(req.params.lunchDayId)
    const lunchDay = req.body

    if (lunchDayId !== lunchDay.lunchDayId) {
      const message = 'Bad request, IDs do not match'
      res.status(400).send({ message: message })
      return
    }
    await updateLunchDay(lunchDayId, lunchDay)
    res.send()
  } catch (e) {
    const message = 'Error updating Lunch Day'
    res.status(500).send({ message: message, error: e.toString() })
  }
})

module.exports = router

/*
type LunchDayT = {
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
 newLunchWeek: {
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

import { add, parseISO, format } from 'date-fns'

export const seedLunchDays = (lunchWeek) => {
  const lunchDays = []
  const weekOfDate = parseISO(lunchWeek.weekOf)

  for (let i = 0; i < 5; i++) {
    const calculatedDay = add(weekOfDate, { days: i })
    const formattedDay = format(calculatedDay, 'yyyy-MM-dd')
    const matchedI = lunchWeek.lunchDays.findIndex((ld) => ld.day.includes(formattedDay))

    lunchDays.push((matchedI !== -1)
      ? lunchWeek.lunchDays[matchedI]
      // does not exist in the db
      : {
          day: calculatedDay,
          lunchWeekId: lunchWeek.lunchWeekId,
          menuDetails: null,
        })
  }

  return lunchDays
}

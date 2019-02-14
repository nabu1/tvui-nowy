/* eslint-disable camelcase */

let x = `{ "text": "Dzień", "value": null },
{ "text": "Czw 14 Luty", "value": 1550102400000, "dayString": "Czw 14 Luty" },
{ "text": "Pt 15 Luty", "value": 1550188800000, "dayString": "Pt 15 Luty" },
{ "text": "Sob 16 Luty", "value": 1550275200000, "dayString": "Sob 16 Luty" },
{ "text": "Nie 17 Luty", "value": 1550361600000, "dayString": "Nie 17 Luty" },
{ "text": "Pon 18 Luty", "value": 1550448000000, "dayString": "Pon 18 Luty" },
{ "text": "Wt 19 Luty", "value": 1550534400000, "dayString": "Wt 19 Luty" },
{ "text": "Śr 20 Luty", "value": 1550620800000, "dayString": "Śr 20 Luty" }
`


// export const days = () => {
const days = () => {
  const weekDayNames = ['Nie', 'Pon', 'Wt', 'Śr', 'Czw', 'Pt', 'Sob']
  const monthNames = ['Sty', 'Luty', 'Mar', 'Kwi', 'Maj', 'Cze', 'Lip', 'Sie', 'Wrz', 'Paź', 'Lis', 'Gru']
  const daysForSelectBox = []

  daysForSelectBox.push({
    text: 'Dzień',
    value: null,
  })

  for (let index = 0; index < 7; index++) {
    const startOfDay = new Date().setUTCHours(index * 24, 0, 0, 0)
    const dayName = weekDayNames[new Date(startOfDay).getDay()]
    const dayOfMonth = new Date(startOfDay).getDate()
    const monthName = monthNames[new Date(startOfDay).getMonth()]
    const dayString = `${dayName} ${dayOfMonth} ${monthName}`

    const dayObj = {
      text: dayString,
      value: startOfDay,
      dayString,
    }

    daysForSelectBox.push(dayObj)
  }

  return daysForSelectBox
}

const hoursArray = (start, end, isEnd) => {
  const hours = []

  for (let index = start + isEnd; index < end; index++) {
    const hour = {
      text: index,
      value: index,
    }
    hours.push(hour)
  }

  const lineFirst = isEnd ? { text: 'Do godziny', value: null } : { text: 'Od godziny', value: null }
  hours.unshift(lineFirst)
  return hours
}

// export const startHours = (day, endHour) => {
const startHours = (day, endHour) => {
  if ((!day || new Date(day).getDate() === new Date().getDate()) && !endHour) {
    return hoursArray(new Date().getHours(), 24, false)
  }
  return hoursArray(3, 24, false)
}

//export const endHours = (day, startHour) => {
const endHours = (day, startHour) => {
  // console.log('%c startHour = ' + startHour, 'color: white')

  if ((!day || new Date(day).getDate() === new Date().getDate()) ) {
    if (startHour) {
      return hoursArray(startHour, 25, true)
    }
    return hoursArray(new Date().getHours(), 25, true)
  }

  if (startHour) {
    return hoursArray(startHour, 25, true)
  }

  return hoursArray(3, 25, true)
}


module.exports.days = days
module.exports.startHours = startHours
module.exports.endHours = endHours

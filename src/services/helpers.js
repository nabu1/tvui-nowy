export const days = () => {
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

export const endHours = (day, startHour) => {
  let start = 3

  console.log('_____________________________________')

  console.log('%c day = ' + day, 'color: violet')
  console.log('%c startHour = ' + startHour, 'color: violet')

  console.log('%c new Date(day) = ' + new Date(day).toLocaleDateString(), 'color: violet')
  console.log('%c new Date() = ' + new Date().toLocaleDateString(), 'color: violet')

  const today = new Date(day).toLocaleDateString() === new Date().toLocaleDateString()
  console.log('%c today = ' + today, 'color: violet')

  const currentHour = new Date().getHours()
  console.log('%c currentHour = ' + currentHour, 'color: violet')

  if (!day || today) {
    start = startHour || currentHour - 1
  }
  else {
    start = startHour || 3
  }

  console.log('%c start = ' + start, 'color: violet')

  const hours = [{ text: 'Godzina Do', value: null }]

  for (let index = start + 1; index < 25; index++) {
    const hour = {
      text: index,
      value: index,
    }
    hours.push(hour)
  }

  // console.log('%c hours = ', 'color: violet')
  //console.table(hours)

  return hours
}

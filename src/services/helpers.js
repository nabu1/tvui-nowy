/* eslint-disable camelcase */
const axios = require('axios')

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
      value: startOfDay
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

const startHours = (day, endHour) => {
  if ((!day || new Date(day).getDate() === new Date().getDate()) && !endHour) {
    return hoursArray(new Date().getHours(), 24, false)
  }
  return hoursArray(3, 24, false)
}

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



const email = mailTo  => {

  let html = '<h3><a href="https://programtv.onet.pl/tv/ojciec-mateusz-3-35645?entry=29722054">Sob 16 Luty 15:30 TVN Ojciec Mateusz</a></h3>'
  html += '<h3><a href="https://programtv.onet.pl/tv/ojciec-mateusz-3-35645?entry=29722054">Sob 16 Luty 22:00 TVN Wujek Zdzisiek</a></h3>'

  const url = 'https://wt-nabu1312-gmail-com-0.sandbox.auth0-extend.com/email?to=' + mailTo + '&html=' + html

  console.log('%c url = ' + url, 'color: white')


  axios.post(url)
    .then(() => console.log('Mail pchnięty !'))
    .catch( err => console.log('Mail dupa: ', err))
}


module.exports.days = days
module.exports.startHours = startHours
module.exports.endHours = endHours
module.exports.email = email

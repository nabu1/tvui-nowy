import axios from 'axios'
import url from './ajaxHelpers'
import { LITERALS } from './constants'

export const ajaxGetSelectedPrograms = context => {
  axios
    .get(url(context))
    .then(res => {
      // if (res.data.length > 999) alert(LITERALS.EXCESSIVE_DATA_MSG)
      console.log('%c res.data.length = ' + res.data.length, 'color: violet')

      context.commit('GET_DOCUMENTS_COUNT', res.data.length)
      context.commit('START_STATIONS', res.data)
    })
    .catch(err => console.log('My error: ', err))
    .finally(() => {
      context.commit('SET_LOADING', false)
    })
}

export const ajaxFindText = (context, text) => {

  let query = ''
  const minutes = 60 * 1000
  const day = context.getters.getDay
  //const startOfDay = context.getters.getDay || new Date().setUTCHours(0, 0, 0, 0)
  const startOfDay = day || new Date().setUTCHours(0, 0, 0, 0)
  let startHour = context.getters.getStartHour
  const endHour = context.getters.getEndHour || 24
  let categories = context.getters.getCategories
  let stations = context.getters.getStations

  if (!startHour && (!day || new Date(day).getDate() === new Date().getDate())) {
    startHour = new Date().getHours()
  }

  const start = startOfDay + startHour * 60 * minutes - 30 * minutes

  console.log('%c startHour = ' + startHour, 'color: orange')
  console.log('%c start = ' + new Date(start), 'color: orange')
  console.log('%c new Date().getMinutes() - 30 = ' + (new Date().getMinutes() - 30), 'color: white')

  const end = startOfDay + endHour * 60 * minutes
  console.log('%c end = ' + new Date(end), 'color: orange')

  categories = categories && categories.length ? JSON.stringify(categories) : null
  stations = stations ? encodeURIComponent(JSON.stringify(stations)) : null

  ///query = `q={$or:[{"type":{"$regex":".*${text}.*",$options:"i"}},{"title":{"$regex":".*${text}.*",$options:"i"}}]}`

  /// const queryText = `s={timestamp:1}&q={$or:[{"type":{"$regex":".*${text}.*",$options:"i"}},{"title":{"$regex":".*${text}.*",$options:"i"}}]}`

  /// const queryTextFragment = `{$or:[{"type":{"$regex":".*${text}.*",$options:"i"}},{"title":{"$regex":".*${text}.*",$options:"i"}}]}`

  const queryTextFragment = `$or:[{"type":{"$regex":".*${text}.*",$options:"i"}},{"title":{"$regex":".*${text}.*",$options:"i"}}]`


  const queryHoursText = `s={timestamp:1}&q={"timestamp":{$gte:${start}},$and:[{"timestamp":{$lte:${end}}}],` + queryTextFragment + `}`
  console.log('%c queryHoursText = ' + queryHoursText, 'color: lime')










  const queryHours = `s={timestamp:1}&q={"timestamp":{$gte:${start}},$and:[{"timestamp":{$lte:${end}}}`
  const queryStations = `${queryHours},{$and:[{"channel":{$in:${stations}}}]}]}`
  const queryCategories = `${queryHours},{$and:[{"category":{$in:${categories}}}]}]}`
  const queryCategoriesStations = `${queryHours},{$and:[{"category":{$in:${categories}}},{$and:[{"channel":{$in:${stations}}}]}]}]}`

  if (categories && stations) {
    console.log('categories && stations')
    query = queryCategoriesStations
  }
  else if (categories) {
    console.log('categories')
    query = queryCategories
  }
  else if (stations) {
    console.log('stations')
    console.log('%c stations = ' + stations, 'color: lime')
    query = queryStations
  }
  else {
    console.log('hours')
    query = `${queryHours}]}`
  }



  /// const queryHours = `s={timestamp:1}&q={"timestamp":{$gte:${start}},$and:[{"timestamp":{$lte:${end}}}`






  ///const urlFindText = LITERALS.TV_LIST_PREFIX + query + LITERALS.TV_LIST_SUFFIX

  const urlFindText = LITERALS.TV_LIST_PREFIX + queryHoursText + LITERALS.TV_LIST_SUFFIX
  //const urlFindText = LITERALS.TV_LIST_PREFIX + queryText + LITERALS.TV_LIST_SUFFIX

  console.log('%c urlFindText = ' + urlFindText, 'color: white')

  axios
    .get(urlFindText)
    .then(res => {
      console.log('%c res.data = ' + res.data.length, 'color: white')
      context.commit('GET_DOCUMENTS_COUNT', res.data.length)
      context.commit('SHOW_CATEGORIES', false)
      context.commit('AJAX_FIND_TEXT', res.data)
    })
    .catch(err => console.log('My error: ', err))
    .finally(() => {
      context.commit('SET_LOADING', false)
    })
}

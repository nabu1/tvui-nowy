import { LITERALS } from './constants'

export default context => {
  let query = ''
  const minutes = 60 * 1000
  const day = context.getters.getDay
  const startOfDay = day || new Date().setUTCHours(0, 0, 0, 0)
  let startHour = context.getters.getStartHour
  const endHour = context.getters.getEndHour || 24
  let categories = context.getters.getCategories
  let stations = context.getters.getStations

  if (!startHour && (!day || new Date(day).getDate() === new Date().getDate())) {
    startHour = new Date().getHours()
  }

  const start = startOfDay + startHour * 60 * minutes - 30 * minutes
  const end = startOfDay + endHour * 60 * minutes

  categories = categories && categories.length ? JSON.stringify(categories) : null
  stations = stations && stations.length ? encodeURIComponent(JSON.stringify(stations)) : null

  const queryHours = `s={timestamp:1}&q={"timestamp":{$gte:${start}},$and:[{"timestamp":{$lte:${end}}}`
  const queryStations = `${queryHours},{$and:[{"channel":{$in:${stations}}}]}]}`
  const queryCategories = `${queryHours},{$and:[{"category":{$in:${categories}}}]}]}`
  const queryCategoriesStations = `${queryHours},{$and:[{"category":{$in:${categories}}},{$and:[{"channel":{$in:${stations}}}]}]}]}`

  if (categories && categories.length && stations && stations.length) {
    query = queryCategoriesStations
  }
  else if (categories && categories.length ) {
    query = queryCategories
  }
  else if (stations && JSON.parse(decodeURIComponent(stations)).length) {
    query = queryStations
  }
  else {
    query = `${queryHours}]}`
  }

  const urlString = LITERALS.TV_LIST_PREFIX + query + LITERALS.TV_LIST_SUFFIX

  return urlString
}

import Vue from 'vue'
import Vuex from 'vuex'
import { ajaxAddTodaysPrograms, ajaxGetSelectedPrograms, ajaxFindText } from '../services/ajax'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    todaysPrograms: [],
    selectedPrograms: null,
    selectedStations: null,
    loading: false,
    stations: null,
  },
  getters: {
    getTodaysPrograms(state) {
      return state.todaysPrograms
    },
    getSelectedStations(state) {
      return state.selectedStations
    },
    getLoading(state) {
      return state.loading
    },
    getSelectedPrograms(state) {
      return state.selectedPrograms
    },
    getChannels() {
      // return state.stations
      return ['BBC Lifestyle', 'CANAL+ Discovery']
    }

  },
  mutations: {
    ADD_TODAYS_PROGRAMS(state, todaysPrograms) {
      // console.log('ADD_TODAYS_PROGRAMS')
      // console.log('todaysPrograms = ', JSON.stringify(todaysPrograms))
      // console.table(todaysPrograms, ['title'])

      state.todaysPrograms = todaysPrograms || state.selectedPrograms

      if (todaysPrograms) {
        //console.table(todaysPrograms, ['title'])
        state.loading = true
      }

      // state.selectedPrograms = []
    },
    SET_SELECTED_STATIONS(state, stations) {
      state.selectedStations = stations
    },
    SET_LOADING(state, loadingStatus) {
      state.loading = loadingStatus
    },
    ADD_SELECTED_PROGRAMS(state, selectedPrograms) {
      // console.table(selectedPrograms, ['title'])
      state.selectedPrograms = selectedPrograms
    },
    AJAX_FIND_TEXT(state, foundPrograms) {
      console.log('foundPrograms = ', foundPrograms)
      state.todaysPrograms = foundPrograms
    }
  },
  actions: {
    addTodaysPrograms(context) {
      ajaxAddTodaysPrograms(context)
    },
    getSelectedPrograms(context, searchData) {
      ajaxGetSelectedPrograms(context, searchData)
    },
    setSelectedStations(context, stations) {
      context.commit('SET_SELECTED_STATIONS', stations)
    },
    setLoading(context, loadingStatus) {
      context.commit('SET_LOADING', loadingStatus)
    },
    addSelectedPrograms(context, selectedPrograms) {
      context.commit('ADD_SELECTED_PROGRAMS', selectedPrograms)
    },
    findText(context, text) {
      context.commit('SET_LOADING', true)
      ajaxFindText(context, text)
    },
  },
})

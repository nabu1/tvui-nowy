<template src="./Search.html"></template>

<script>
import { days, startHours, endHours } from '../../services/helpers'
import { CATEGORIES } from '../../services/constants'

export default {
  data() {
    return {
      day: this.$store.getters.getDay,
      startHour: this.$store.getters.getStartHour,
      endHour: this.$store.getters.getEndHour,
      categories: this.$store.getters.getCategories,
      textSearch: null,
      days: days(),
      categoriesList: CATEGORIES,
      loading: this.$store.getters.getLoading,
    }
  },
  computed: {
    startHours() {
      return startHours(this.$store.getters.getDay, this.$store.getters.getEndHour)
    },
    endHours() {
      return endHours(this.$store.getters.getDay, this.$store.getters.getStartHour)
    },
    favoritesCount() {
      return this.$store.getters.getFavorites ? this.$store.getters.getFavorites.length : 0
    },
  },
  mounted() {
    if (!localStorage.getItem('vuex_ft')) {
      localStorage.setItem('vuex_ft', true)
    }
  },
  methods: {
    categorySelected(categories) {
      if (!categories.length) {
        categories = ['film', 'serial', 'sport', 'wiadomosci', 'rozrywka', 'dla dzieci', 'inne']
      }

      const todaysPrograms = this.$store.getters.getTodaysPrograms
      const categoryFiltered = todaysPrograms.filter(el => categories.includes(el.category))

      this.$store.commit('SHOW_CATEGORIES', true)
      this.$store.dispatch('setCategoryFiltered', categoryFiltered)
      this.$store.dispatch('setCategories', categories)
    },
    daySelected(day) {
      this.$store.dispatch('setDay', day)
    },
    startHourSelected(startHour) {
      this.$store.dispatch('setStartHour', startHour)
    },
    endHourSelected(endHour) {
      this.$store.dispatch('setEndHour', endHour)
    },
    hideModalFirstTime() {
      this.$refs.modalFirstTime.hide()
    },
    search() {
      if (this.textSearch) return this.$store.dispatch('findText', this.textSearch)

      this.$store.commit('SHOW_CATEGORIES', false)
      this.$store.commit('SHOW_FAVORITES', false)
      this.$store.dispatch('setLoading', true)
      this.$store.dispatch('getSelectedPrograms')
    },
    resetAll() {
      this.day = null
      this.startHour = null
      this.endHour = null
      this.categories = []
      this.textSearch = null
      this.$store.dispatch('resetState')
    },
    show() {
      this.$store.commit('SHOW_FAVORITES', true)
    },
    resetFavorites() {
      this.$store.dispatch('resetFavorites')
      this.$store.dispatch('getSelectedPrograms')
      this.$store.dispatch('setLoading', true)
    },
  },
}
</script>

<style scoped>
div {
  color: white;
}
.d-block {
  color: black;
}
</style>

<template src="./Table.html"></template>

<script>
import { FIELDS } from '../../services/constants'

export default {
  data() {
    return {
      selected: [],
      fields: FIELDS,
    }
  },
  computed: {
    items() {
      if (this.$store.getters.showFavorites) {
        console.log('1')
        // this.$store.commit('SHOW_FAVORITES', false)
        return this.$store.getters.getFavorites || []
      } else if (this.$store.getters.getCategoryFiltered && this.$store.getters.getCategoryFiltered.length) {
        // console.log('2')
        return this.$store.getters.getCategoryFiltered
      } else {
        console.log('3')
        this.$store.commit('SET_LOADING', false)
        return this.$store.getters.getTodaysPrograms
      }
    },
    loading() {
      return this.$store.getters.getLoading
    },
  },
  created() {
    this.$store.dispatch('startStations')
    this.$store.dispatch('setLoading', true)
  },
  methods: {
    onRowClicked(item) {
      console.clear()
      console.log('Tu onRowClicked: item = ', item)

      let favorites = new Set(this.$store.getters.getFavorites)
      console.log('favorites PRZED = ', favorites.size)

      if (this.$store.getters.showFavorites) {
        console.log('1')
        favorites.forEach(el => {
          if (el.id === item.id) favorites.delete(el)
        })
      }
      else {
        console.log('2')
        console.log('favorites PRZED = ', favorites.size)
        favorites.add(item)
        console.log('favorites PO = ', favorites.size)
      }

      favorites = Array.from(favorites)
      console.log('favorites = ', favorites)
      this.$store.dispatch('addFavorites', favorites)
    },
  },
}
</script>

<style scoped>
div {
  color: white;
}
</style>


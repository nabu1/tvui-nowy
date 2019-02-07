<template src="./Navi.html"></template>

<script>
import store from '../../store/store'
import { LITERALS } from '../../services/constants'

export default {
  data() {
    return {
      showBadge: false
    }
  },
  computed: {
    loading() {
      return this.$store.getters.getLoading
    },
    stations() {
      let stations = store.getters.getStations
      if (stations) {
        return stations.join(', ').length > 70 ? stations.join(', ').slice(0, 70) + ' ...' : stations.join(', ')
      }
    },
  },
}
</script>

<style>
a {
  color: greenyellow;
}
body {
  color: white;
  font-variant: italic;
}
.stations {
  color: yellow;
}
</style>

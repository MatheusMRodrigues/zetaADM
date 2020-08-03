<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import { mapActions} from "vuex"

export default {
  name: 'App',

  methods: {
    ...mapActions("dish", ["bindDishes", "bindBreakfast", "bindLunch", "bindDinner", "bindBreakfast2", "bindLunch2", "bindDinner2"]),
  },

  mounted () {
    this.bindDishes()
    this.bindLunch()
    this.bindBreakfast()
    this.bindDinner()
    this.bindLunch2()
    this.bindBreakfast2()
    this.bindDinner2()
  }
}
</script>

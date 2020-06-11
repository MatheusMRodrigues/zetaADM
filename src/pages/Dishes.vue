<template>
  <q-page padding>
    <div class="row justify-evenly q-gutter-lg">
      <q-card @click="dishDialog = true" class="my-card bg-red-5 col-md-12 flex flex-center grow cursor-pointer" style="max-width: 350px; width: 100%;">
        <div class="text-center">
          <q-icon
          name="las la-plus-circle"
          size="10em"
          color="white"
          class="ribbon-icon on-left"/>
          <div class="app-font-medium text-h6 text-white">ADICIONAR NOVO</div>
        </div>
      </q-card>
      <div v-for="dish in dishes" :key="dish.dishID">
        <dish :dish="dish"/>
      </div>
    </div>
    <q-dialog v-model="dishDialog" full-width full-height transition-show="scale" transition-hide="scale">
      <dish-dialog/>
    </q-dialog>
  </q-page>
</template>

<style scoped>
  .img-caption {
    padding-left: 16px !important;
    padding-right: 16px !important;
    padding-top: 8px !important;
    padding-bottom: 8px !important;
  }
  .grow { transition: all .2s ease-in-out; }
  .grow:hover { transform: scale(1.1); }
</style>

<script>
import { mapGetters } from "vuex"

export default {
  name: 'PageIndex',

  components: {
    "dish-dialog": require("components/DishDialog.vue").default,
    "dish": require("components/Dish.vue").default
  },

  data () {
    return {
      dishDialog: false,
    }
  },

  computed: {
    ...mapGetters("dish", ["dishes"])
  },
}
</script>

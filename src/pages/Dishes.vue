<template>
  <q-page padding>
    <div class="row col-12 justify-center q-mb-md">
      <div class="col-6">
        <q-input outlined v-model="search" placeholder="Pesquisar">
          <template v-slot:append>
              <q-icon name="search" />
          </template>
        </q-input>
      </div>
    </div>
    <div class="row justify-center q-gutter-lg">
      <q-card @click="dishDialog = true" class="my-card bg-red-5 col-md-12 flex flex-center grow cursor-pointer" style="max-width: 350px; width: 100%; height: 258px">
        <div class="text-center">
          <q-icon
          name="las la-plus-circle"
          size="10em"
          color="white"
          class="ribbon-icon on-left"/>
          <div class="app-font-medium text-h6 text-white">ADICIONAR NOVO</div>
        </div>
      </q-card>
      <div v-for="dish in filteredDishes" :key="dish.dishID">
        <dish :dish="dish"/>
      </div>
    </div>
    <q-dialog v-model="dishDialog" full-width full-height transition-show="scale" transition-hide="scale">
      <dish-dialog/>
    </q-dialog>
  </q-page>
</template>

<style scoped>
  
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
      search: '',
    }
  },

  computed: {
    ...mapGetters("dish", ["dishes", 'listBreakfast', 'listLunch', 'listDinner']),

    filteredDishes:function() {
       var self=this;
       console.log(this.dishes)
       return this.dishes.filter(function(dish){return dish.itemName.toLowerCase().indexOf(self.search.toLowerCase())>=0;});
       //return this.customers;
    }
  },
}
</script>

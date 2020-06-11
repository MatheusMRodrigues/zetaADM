<template>
  <q-card class="bg-white" style="width: 600px">
    <q-bar class="bg-primary q-py-lg">
      <div class="app-font-medium text-white">NOVO CARDAPIO - {{date}}</div>
      <q-space />
      <q-btn class="text-white" dense flat icon="close" v-close-popup>
        <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
      </q-btn>
    </q-bar>

    <q-card-section>
    <q-form @submit.prevent="submitForm" class="q-gutter-md">

      <div class="app-font-medium text-red-5 text-h6">Refeição:</div>

      <q-select filled v-model="menu.menu" :options="optionsMenu" label="Selecione uma categoria" />

      <div class="app-font-medium text-red-5 text-h6">Prato:</div>

      <q-select filled multiple v-model="menu.dish" :options="optionsDish" label="Selecione os pratos" />

      <div class="row reverse">
        <q-btn label="Submit" type="submit" color="primary"/>
        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
      </div>
    </q-form>
    </q-card-section>

  </q-card>
</template>

<style scoped>
  .inputfile {
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;
  }

  .inputfile + label {
    font-size: 1.25em;
    font-weight: 700;
    color: white;
    background-color: #ef5350;
    display: inline-block;
    cursor: pointer;
    padding: .5em;
  }

  .inputfile + label * {
	pointer-events: none;
}
</style>

<script>
import { mapGetters } from "vuex"
export default {
  name: 'PageIndex',

  props: ['date'],

  data () {
    return {
      optionsMenu: [
        {
          label: 'Café da manhã',
          value: 'breakfast'
        },
        {
          label: 'Almoço',
          value: 'lunch'
        },
        {
          label: 'Jantar',
          value: 'dinner'
        }
      ],
      teste: [],
      optionsDish: [],
      isVegan: false,
      menu:{
        menuDate: this.date,
        menu: null,
        dish: null
      }
    }
  },

  watch: {
    'dish.vegan': function (val) {
      if(val == 'true') {
        console.log(val)
        this.dish.vegie = 'true'
        this.isVegan = true
      }
      else{
        this.dish.vegie = null
        this.isVegan = false
      }
    }
  },

  computed: {
    ...mapGetters("dish", ["dishes"])
  },

  methods: {

    fillDishOptions () {
      console.log(typeof this.dishes)

      console.log(this.dishes)
      console.log(this.dishes.length)
      const dishesC = JSON.parse(JSON.stringify([...this.dishes]))
      this.dishes.forEach(dish => {
        console.log('teste')
        this.optionsDish.push({
            label : dish.itemName, 
            value: dish.dishID
        });
      })
    },

    submitForm () {
      console.log(this.menu)
    }
  },

  mounted () {
    // this.bindDishes()

    this.fillDishOptions()
  }
}
</script>

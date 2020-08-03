<template>
  <div style="width: 600px">
    <q-card class="bg-white">
      <q-bar class="bg-primary q-py-lg">
        <div class="app-font-medium text-white">NOVO CARDAPIO - {{date}}</div>
        <q-space />
        <q-btn class="text-white" dense flat icon="close" v-close-popup>
          <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
        </q-btn>
      </q-bar>

      <q-card-section>
      <q-inner-loading :showing="visible">
        <q-spinner-gears size="50px" color="primary" />
      </q-inner-loading>
      <q-form v-show="visible == false" @submit.prevent="submitForm" class="q-pa-sm">

        <div class="app-font-medium text-red-5 text-h6">Refeição:</div>

        <q-select filled v-model="menu.menu" :options="optionsMenu" label="Selecione uma categoria" />

        <div class="app-font-medium q-mt-md text-red-5 text-h6">Prato:</div>

        <q-btn @click="dishPicker = true" class="q-mb-md q-py-xs" color="primary" style="width: 100%"> 
          <q-icon size="3em" name="add" />
        </q-btn>

        <q-list dense bordered class="bg-grey-3 q-mb-md q-py-xs q-px-md" style="min-height: 30px">
          <q-item v-if="!auxList.length">
            <q-item-section class="text-center">
              VAZIO
            </q-item-section>
          </q-item>
          <q-item class="q-px-sm" v-for="(item, index) in listDishes" :key="index">
            <q-item-section thumbnail>
              <q-avatar rounded>
                <q-img :src="item.itemImage" :ratio="1 / 1" style="width: 30vw"/>
              </q-avatar>
            </q-item-section>
            <q-item-section>{{item.itemName}}</q-item-section>
            <q-item-section avatar>
              <q-icon @click="() => {listDishes.splice(index, 1); auxList.splice(index, 1); delete menu.dishes[index]}" class="cursor-pointer" size="sm" color="primary" name="las la-times" />
            </q-item-section>
          </q-item>
        </q-list>

        <div class="row reverse">
          <q-btn label="Submit" type="submit" color="primary"/>
          <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
        </div>
      </q-form>
      </q-card-section>

    </q-card>

     <q-dialog v-model="dishPicker" full-width persistent transition-show="scale" transition-hide="scale">
      <q-card>
        <q-bar class="bg-primary q-py-lg">
          <div class="app-font-medium text-white">CLIQUE PARA SELECIONAR</div>
          <q-space />
          <q-btn class="text-white" dense flat icon="close" v-close-popup>
            <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>
        <q-card-section>
        <div class="row justify-evenly q-gutter-lg">
          <div v-for="dish in dishes" :key="dish.dishID">
            <div @click="addItem(dish)">
              <q-icon v-show="auxList.includes(dish.dishID)" class="absolute text-green bg-white q-pa-md checkIcon2" size="2em" name="las la-check" />
              <dish :dish="dish"/>
            </div>
          </div>
        </div>
        </q-card-section>
        <q-card-actions align="right" class="bg-white text-red-5">
          <q-btn flat label="OK" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<style scoped>
  .checkIcon2{
    transform: translate(160px, 5px);
    z-index: 5;
    border-radius: 50px;
    border: #ef5350 solid 1px;
  }
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
import { mapGetters, mapActions } from "vuex"
import {uid} from "quasar"

export default {
  name: 'PageIndex',

  components: {
    "dish": require("components/DishPicker.vue").default
  },

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
      visible: false,
      isVegan: false,
      dishPicker: false,
      listDishes: [],
      auxList:[],
      count: 0,
      menu:{
        menuDate: this.date,
        menu: null,
        dishes: {}
      }
    }
  },

  watch: {
    // 'menu.dishes': function (val) {
    //  this.dish = this.dishFinder(this.item.dishID)
    // }
  },

  computed: {
    ...mapGetters("dish", ["dishes"])
  },

  methods: {

    ...mapActions("dish", ["createMenu"]),

    addItem (dish) {
      if (this.listDishes.includes(dish)) {
        const indexDishList = this.listDishes.indexOf(dish)
        this.listDishes.splice(indexDishList, 1)
        const indexAuxList = this.auxList.indexOf(dish.dishID)
        this.auxList.splice(indexAuxList, 1)
        delete this.menu.dishes[indexAuxList]
      }
      else{
        this.listDishes.push(dish)
        this.auxList.push(dish.dishID)
        this.menu.dishes[this.count] = {dishID: dish.dishID, itemID: uid(), totalRating: 0, userRating: {}}
        this.count += 1
      }
    },

    submitForm () {
      this.visible = true
      this.createMenu(this.menu).then(result => {
        this.$emit('beleza')
      })
      .catch(error => {
        console.log(error)
      })
    }
  },

  mounted () {
    // this.bindDishes()

  }
}
</script>

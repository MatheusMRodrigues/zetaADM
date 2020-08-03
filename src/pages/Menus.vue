<template>
    <q-page padding :key="refresh">
        <q-inner-loading :showing="visible">
            <q-spinner-gears size="50px" color="primary" />
        </q-inner-loading>
        <div v-if="visible == false" class="row">

            <q-date class="col-4" model="Apr 28, Sunday, 2019" mask="DD/MM/YYYY" v-model="date" color="red-5" :event-color="'red-3'" :events="events" today-btn />

            <div class="col q-ml-lg">
                <q-btn @click="dishDialog = true" class="q-mb-md q-py-xs" color="primary" style="width: 100%"> 
                    <q-icon left size="3em" name="add" />
                </q-btn>
                <div>
                    <div class="app-font-medium text-bold text-red-5 q-mb-sm">Café da Manhã: </div>
                    <q-list v-for="item in breakfastList.items" :key="item.breakfastID" bordered separator>
                        <q-item clickable v-ripple>
                            <q-item-section thumbnail>
                            <q-avatar rounded class="q-px-md">
                                <q-img :src="dishFinder(item.dishID).itemImage || {}" :ratio="1 / 1" style="width: 30vw"/>
                            </q-avatar>
                            </q-item-section>
                            <q-item-section class="q-px-md">{{dishFinder(item.dishID).itemName}}</q-item-section>
                        </q-item>
                    </q-list>
                </div>
                <div>
                    <div class="app-font-medium text-bold text-red-5 q-mb-sm q-mt-md">Almoço: </div>
                    <q-list v-for="item in lunchList.items" :key="item.lunchID" bordered separator>
                        <q-item clickable v-ripple>
                            <q-item-section thumbnail>
                            <q-avatar rounded class="q-px-md">
                                <q-img :src="dishFinder(item.dishID).itemImage || {}" :ratio="1 / 1" style="width: 30vw"/>
                            </q-avatar>
                            </q-item-section>
                            <q-item-section class="q-px-md">{{dishFinder(item.dishID).itemName}}</q-item-section>
                        </q-item>
                    </q-list>
                </div>
                <div>
                    <div class="app-font-medium text-bold text-red-5 q-mb-sm q-mt-md">Jantar: </div>
                    <q-list v-for="item in dinnerList.items" :key="item.dinnerID" bordered separator>
                        <q-item clickable v-ripple>
                            <q-item-section thumbnail>
                            <q-avatar rounded class="q-px-md">
                                <q-img :src="dishFinder(item.dishID).itemImage || {}" :ratio="1 / 1" style="width: 30vw"/>
                            </q-avatar>
                            </q-item-section>
                            <q-item-section class="q-px-md">{{dishFinder(item.dishID).itemName}}</q-item-section>
                        </q-item>
                    </q-list>
                </div>
            </div>
        </div>
        <q-dialog v-model="dishDialog" transition-show="scale" transition-hide="scale">
            <menu-dialog @beleza="workarround()" :date="date"/>
        </q-dialog>
    </q-page>
</template>

<style scoped>
  
</style>

<script>
import {mapGetters} from 'vuex'
import moment from "moment"
import {
  Loading,
  QSpinnerGears
} from 'quasar'

export default {
  name: 'PageMenus',

  components: {
      "menu-dialog": require("components/MenuDialog.vue").default,
  },

  data () {
    return {
        refresh: 0,
        visible: false,
        dishDialog: false,
        date: '28/07/1997',
        events:[],
        breakfastList: [],
        lunchList: [],
        dinnerList: []
    }
  },
  mounted(){
    this.visible = true
    this.date = new Date().getDate().toString().padStart(2,0)+'/'+(new Date().getMonth()+1).toString().padStart(2,0)+'/'+new Date().getFullYear();
    this.getEvents()
    setTimeout(() => {
        this.visible = false
    }, 1000);

    
  },

  watch: {
  date: {
     handler(val) {
          this.breakfastList = this.listBreakfast(val)
          this.lunchList = this.listLunch(val)
          this.dinnerList = this.listDinner(val)
      },
     immediate: true
    }
  },
  computed: {
    ...mapGetters("dish", ["dishes", 'listBreakfast', 'listLunch', 'listDinner', 'dishFinder', 'breakfastDates', 'lunchDates', 'dinnerDates'])
  },

  methods:{
      workarround () {
        this.visible = true
        this.dishDialog = false
        let auxDate = this.date
        this.date = '28/07/1997'
        setTimeout(() => {
            this.date = auxDate
            this.breakfastList = this.listBreakfast(this.date)
            this.lunchList = this.listLunch(this.date)
            this.dinnerList = this.listDinner(this.date)
            this.getEvents()
            this.visible = false
        }, 2000);
      },

      getEvents () {
            this.breakfastDates.forEach(item => {
            let dt = moment(item.menuDate, "DD/MM/YYYY")
            this.events.push(dt.format('YYYY/MM/DD'))
            })
            this.lunchDates.forEach(item => {
                let dt = moment(item.menuDate, "DD/MM/YYYY")
                this.events.push(dt.format('YYYY/MM/DD'))
            })
            this.dinnerDates.forEach(item => {
                let dt = moment(item.menuDate, "DD/MM/YYYY")
                this.events.push(dt.format('YYYY/MM/DD'))
            })
      }
  }
}
</script>

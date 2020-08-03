<template>
  <q-page padding>
    <div class="row justify-evenly">
      <div>
        <div>Pratos mais favoritados</div>
        <VueApexCharts :key="update" width="400" type="bar" :options="optionsFavorites" :series="seriesFavorites"></VueApexCharts>
      </div>
    <div>
      <div>Pratos mais bem avaliados</div>
      <VueApexCharts :key="update" width="400" type="bar" :options="optionsRating" :series="seriesRating"></VueApexCharts>
    </div>
    </div>
  </q-page>
</template>

<style scoped>
  
</style>

<script>
import VueApexCharts from 'vue-apexcharts'
import { db } from "boot/firebase"

export default {
  name: 'PageCharts',

  components: {
    VueApexCharts
  },

  data () {
    return {
      update: 0,
      favoriteHolder:[],
      ratingsHolder:[],
      optionsFavorites: {
        chart: {
          id: 'FavoritesChart'
        },
        colors:['#ef5350', '#000000', '#000000'],
        xaxis: {
          categories: []
        }
      },
      seriesFavorites: [{
        name: 'favoritos',
        data: []
      }],
      optionsRating: {
        chart: {
          id: 'RatingsChart'
        },
        colors:['#ef5350', '#000000', '#000000'],
        xaxis: {
          categories: []
        }
      },
      seriesRating: [{
        name: 'Avaliação média',
        data: []
      }]
    }
  },

  mounted(){
    this.getFavoritesData()
    this.getRatingsData()
  },

  methods: {
    getFavoritesData () {
      db.collection('dishes').get()
      .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            let docData = doc.data()
            this.favoriteHolder.push(docData)
          })
      })
      .catch(error => {
        console.log(error)
      })
      .finally(final =>{
        this.update += 1
        this.favoriteHolder.sort(function(a,b) {
          return a.favoriteTotal - b.favoriteTotal;
        });
        this.favoriteHolder.reverse()
        for (let i = 0; i < 10; i++) {
          this.optionsFavorites.xaxis.categories.push(this.favoriteHolder[i].itemName)
          this.seriesFavorites[0].data.push(this.favoriteHolder[i].favoriteTotal)
        }
      })
    },
    getRatingsData () {
    db.collection('dishes').get()
      .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            let docData = doc.data()
            this.ratingsHolder.push(docData)
          })
      })
      .catch(error => {
        console.log(error)
      })
      .finally(final =>{
        this.update += 1
        this.ratingsHolder.sort(function(a,b) {
          return a.ratingAvg - b.ratingAvg;
        });
        this.ratingsHolder.reverse()
        console.log(this.ratingsHolder)
        for (let i = 0; i < 10; i++) {
          this.optionsRating.xaxis.categories.push(this.ratingsHolder[i].itemName)
          this.seriesRating[0].data.push(this.ratingsHolder[i].ratingAvg)
        }
      })
    }
  } 
}
</script>

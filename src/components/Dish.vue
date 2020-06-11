<template>
  <q-card class="my-card bg-red-5 col-md-12 grow cursor-pointer" style="min-width: 350px; width: 100%;">
    <q-img :src= "dish.itemImage" :ratio="16 / 9" basic>
      <div class="img-caption absolute-bottom ">
        <div class="app-font-medium text-bold text-h6">{{dish.itemName}}</div>
      </div>
    </q-img>

    <q-card-section class="card-section q-py-none bg-red-5">
      <div class="row no-wrap items-center rating-section">
        <div class="col">
          <div class="app-font text-caption text-white">
            Satisfação média:
          </div>
          <q-rating
            class="q-mb-sm"
            style="margin-left: -5px;"
            @click.stop = "rateDish"
            v-model="ratingAvg"
            :max="5"
            size="2.3em"
            color="white"
            :icon="icons"
          />
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<style scoped>
 
</style>

<script>
export default {
  name: 'PageIndex',

  props: {
    dish : {
      type: Object,
      default: null,
    }
  },

  data () {
    return {
      ratingAvg: 4,
      icons: [
        "sentiment_very_dissatisfied",
        "sentiment_dissatisfied",
        "sentiment_neutral",
        "sentiment_satisfied",
        "sentiment_very_satisfied"
      ]
    }
  }
}
</script>

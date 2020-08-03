<template>
  <div>
    <q-card @click="dishDialog = true" class="my-card teste bg-red-5 col-md-12 grow cursor-pointer" style="min-width: 350px; width: 100%;">
      <div class="absolute edit-background">
        <q-icon class="text-red-5 q-pa-md bg-white checkIcon" size="xl" name="las la-pen" />
      </div>
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
              readonly
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
    <q-dialog v-model="dishDialog" full-width full-height transition-show="scale" transition-hide="scale">
      <dish-dialog :dishData="dish"/>
    </q-dialog>
  </div>
</template>

<style>
  .edit-background{
    height: 100%;
    width: 100%;
    background-color: rgba(238, 238, 238, 0.4);
    z-index: 5;
    visibility: hidden;
  }

  .checkIcon{
    padding: 30px;
    border-radius: 50px;
    border: #ef5350 solid 1px;
  }

  .my-card:hover .edit-background{
    visibility: visible;
  }
  .edit-background > .checkIcon{
    transform: translate(145px, 70px);
    opacity: 1 !important;
  }
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
export default {
  name: 'PageIndex',

  components: {
    "dish-dialog": require("components/DishDialogEdit.vue").default,
  },

  props: {
    dish : {
      type: Object,
      default: null,
    }
  },

  data () {
    return {
      dishDialog: false,
      ratingAvg: 4,
      icons: [
        "sentiment_very_dissatisfied",
        "sentiment_dissatisfied",
        "sentiment_neutral",
        "sentiment_satisfied",
        "sentiment_very_satisfied"
      ]
    }
  },
  mounted () {
    console.log(this.dish.ratingAvg)
    this.ratingAvg = Math.round(this.dish.ratingAvg)
  }
}
</script>

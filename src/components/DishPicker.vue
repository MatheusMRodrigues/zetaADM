<template>
  <q-card class="my-card bg-red-5 col-md-12 grow cursor-pointer" style="min-width: 200px; width: 100%;">
    <q-img :src= "dish.itemImage" :ratio="16 / 9" basic>
      <div class="img-caption absolute-bottom ">
        <div class="app-font-medium text-bold">{{dish.itemName}}</div>
      </div>
    </q-img>
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
    
    }
  }
}
</script>

<template>
    <q-page padding>
        <div class="row">

            <q-date class="col-4" model="Apr 28, Sunday, 2019" mask="DD/MM/YYYY" v-model="date" today-btn />

            <div class="col q-ml-lg">
                <q-btn @click="dishDialog = true" class="q-mb-md q-py-xs" color="primary" style="width: 100%"> 
                    <q-icon left size="3em" name="add" />
                </q-btn>
                <div>
                    <div class="app-font-medium text-bold text-red-5 q-mb-sm">Café da Manhã: </div>
                    <q-list bordered separator>
                        <q-item clickable v-ripple>
                            <q-item-section>Single line item</q-item-section>
                        </q-item>
                    </q-list>
                </div>
                <div>
                    <div class="app-font-medium text-bold text-red-5 q-mb-sm q-mt-md">Almoço: </div>
                    <q-list bordered separator>
                        <q-item clickable v-ripple>
                            <q-item-section>Single line item</q-item-section>
                        </q-item>
                    </q-list>
                </div>
                <div>
                    <div class="app-font-medium text-bold text-red-5 q-mb-sm q-mt-md">Jantar: </div>
                    <q-list bordered separator>
                        <q-item clickable v-ripple>
                            <q-item-section>Single line item</q-item-section>
                        </q-item>
                    </q-list>
                </div>
            </div>
        </div>
        <q-dialog v-model="dishDialog" transition-show="scale" transition-hide="scale">
            <menu-dialog :date="date"/>
        </q-dialog>
    </q-page>
</template>

<style scoped>
  
</style>

<script>
export default {
  name: 'PageMenus',

  components: {
      "menu-dialog": require("components/MenuDialog.vue").default,
  },

  data () {
    return {
        dishDialog: false,
        date: '28/07/1997'
    }
  }
}
</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="bg-white text-primary">
        <q-avatar @click="goHome" class="cursor-pointer">
          <img src="statics/icons/logo.svg">
        </q-avatar>

        <q-toolbar-title @click="$router.push('/')" class="app-font-medium text-grey-7 cursor-pointer"><span style="color: #ef5350">Z</span>ETA ADMIN</q-toolbar-title>

        <div class="row items-center">
          <div class="col-auto cursor-pointer" @click="userDropdown = !userDropdown">
            <q-icon size="md" name="las la-user-circle" />
          </div>
          <div class="col-auto app-font-medium q-mt-xs">
            <q-btn-dropdown
              class="dropdown"
              v-model="userDropdown"
              flat
              :ripple="false"
              dropdown-icon="las la-level-down-alt"
              color="primary"
              label="ADMINISTRADOR"
            >
              <q-list>
                <q-item clickable v-close-popup>
                  <q-item-section>
                    <q-item-label>Photos</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item clickable v-close-popup>
                  <q-item-section>
                    <q-item-label>Videos</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item clickable v-close-popup>
                  <q-item-section>
                    <q-item-label>Articles</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>
          </div>
        </div>
      </q-toolbar>
      <div>
        <q-tabs
        name="dateTab"
        v-model="tabs"
        dense
        align="justify"
        indicator-color="#ef5350"
        class="bg-white text-red-5"
        :breakpoint="0">
          <q-route-tab to="/dashboard" name="dashboard" label="DASHBOARD" icon="las la-chart-bar" />
          <q-route-tab to="/charts" name="charts" label="GRÁFICOS" icon="las la-chart-pie" />
          <q-route-tab to="/dishes" name="dishes" label="PRATOS" icon="las la-utensils" />
          <q-route-tab to="/menus" name="menus" label="CARDAPIOS" icon="las la-book-open" />
        </q-tabs>
      </div>
    </q-header>

    <q-page-container class="bg-grey-2">
      <router-view />
    </q-page-container>

    <q-footer elevated class="bg-white text-red-5  app-font-medium text-bold q-pa-sm">
      <div>By Matheus de Magalhães Rodrigues</div>
    </q-footer>
  </q-layout>
</template>

<style scoped>
  .dropdown :hover{
    background-color: none !important;
  }
</style>

<script>

export default {
  name: 'MainLayout',

  data () {
    return {
      userDropdown: false,
      tabs: ''
    }
  },

  mounted () {
    console.log(this.$route.path)
    if(this.$route.path === '/'){
      console.log('ta entrando')
      this.dashboard = true
    }
  },

  methods: {
    goHome () {
      this.$router.push('/')
    }
  }
}
</script>

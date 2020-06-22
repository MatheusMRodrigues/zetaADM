
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'charts', component: () => import('pages/Charts.vue') },
      { path: 'dishes', component: () => import('pages/Dishes.vue') },
      { path: 'menus', component: () => import('pages/Menus.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes

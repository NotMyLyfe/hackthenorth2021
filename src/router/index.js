import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue')
  },
  {
    path: '/configuration',
    name: 'Configuration',
    component: () => import('../views/Configuration.vue')
  },
  {
    path : '/sms',
    name : 'SMS',
    component: () => import('../views/SMS.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router

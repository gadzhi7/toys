import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Reviews from '@/views/Reviews'
import Admin from '@/admin/Admin'
import AdminGoods from '@/admin/AdminGoods'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/reviews',
      name: 'reviews',
      component: Reviews
    },
    {
      path: '/admingoods',
      name: 'adminGoods',
      component: AdminGoods
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin
    }
  ]
})

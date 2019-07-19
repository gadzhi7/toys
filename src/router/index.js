import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Admin from '@/admin/Admin'
import AdminGoods from '@/admin/AdminGoods'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/admingoods',
      name: 'AdminGoods',
      component: AdminGoods
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin
    }
  ]
})

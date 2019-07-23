import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Reviews from '@/views/Reviews'
import Portfolio from '@/views/Portfolio'

import Smile from '@/views/Smile'
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
      path: '/portfolio',
      name: 'portfolio',
      component: Portfolio
    },
    {
      path: '/smile',
      name: 'smile',
      component: Smile
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

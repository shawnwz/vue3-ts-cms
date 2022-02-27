import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import Dashboard from '../views/Dashboard.vue'
import Forms from '../views/Forms.vue'
import Tables from '../views/Tables.vue'
import UIElements from '../views/UIElements.vue'
import Login from '../views/Login.vue'
import Modal from '../views/Modal.vue'
import Card from '../views/Card.vue'
import Blank from '../views/Blank.vue'
import Album from '../views/Album.vue'
import AlbumList from '../views/AlbumList.vue'
import RegistrationDetail from '../views/RegistrationDetail.vue'
import NotFound from '../views/NotFound.vue'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
const routes: RouteRecordRaw[] = [
  // {
  //   path: '/',
  //   name: 'Login',
  //   component: Login,
  //   meta: { layout: 'empty' }
  // },
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/album',
    name: 'Album',
    component: Album
  },
  {
    path: '/albumlist',
    name: 'AlbumList',
    component: AlbumList
  },
  {
    path: '/forms',
    name: 'Forms',
    component: Forms
  },
  {
    path: '/cards',
    name: 'Cards',
    component: Card
  },
  {
    path: '/tables',
    name: 'Tables',
    component: Tables
  },
  {
    path: '/ui-elements',
    name: 'UIElements',
    component: UIElements
  },
  {
    path: '/modal',
    name: 'Modal',
    component: Modal
  },
  {
    path: '/blank',
    name: 'Blank',
    component: Blank
  },
  {
    path: '/registration',
    name: 'RegistrationDetail',
    component: RegistrationDetail
  },
  {
    path: '/:pathMatch(.*)',
    redirect: {
      name: 'Dashboard'
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: routes
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router

import Vue from 'vue'
import VueRouter from 'vue-router'
import AdminHome from '../views/AdminHome.vue'
import RegisterPublisher from "../views/RegisterPublisher"
import Login from "../views/Login"
import About from "../views/About"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'AdminHome',
    component: AdminHome
  },
  {
    path: '/registerpublisher',
    name: 'RegisterPublisher',
   
    component:RegisterPublisher
  },
  {
    path: '/login',
    name: 'Login',
   
    component:Login
  },
  {
    path: '/about',
    name: 'about',
   
    component:About
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

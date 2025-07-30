import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import HelloWorld from '../views/HelloWorld.vue'
import Fetch from "../views/Fetch.vue";

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/HelloWorld',
    name: 'HelloWorld',
    component: HelloWorld
  },
  {
    path: '/Fetch',
    name: 'Fetch',
    component: Fetch
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), // use createWebHashHistory() for hash mode
  routes
})

export default router

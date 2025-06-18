import { createRouter, createWebHistory } from 'vue-router'
import Supplier from '../views/Suppliers.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Supplier,
    },
    
  ],
})

export default router

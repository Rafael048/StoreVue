import { createRouter, createWebHistory } from 'vue-router'
import Supplier from '../views/Suppliers.vue'
import Dashboard from '@/views/Dashboard.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Dashboard,
    },{
      path : '/materiaPrima/proveedores',
      name : 'Proveedores',
      component : Supplier
    }
    
  ],
})

export default router

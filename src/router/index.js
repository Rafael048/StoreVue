import { createRouter, createWebHistory } from 'vue-router'
import Supplier from '../views/Suppliers.vue'
import Dashboard from '@/views/Dashboard.vue'
import CategoriesUnits from '@/views/Categories&Units.vue'
import RawMaterial from '@/views/RawMaterial.vue'
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
    },{
      path : '/materiaPrima/categorias&unidades',
      name : 'Categorias&unidades',
      component : CategoriesUnits
    },{
      path : '/materiaPrima',
      name : 'Materia Prima',
      component : RawMaterial
    }
    
  ],
})

export default router

import { createRouter, createWebHistory } from 'vue-router'
import Supplier from '../views/Suppliers.vue'
import Dashboard from '@/views/Dashboard.vue'
import CategoriesUnits from '@/views/Categories&Units.vue'
import RawMaterial from '@/views/RawMaterial.vue'
import Register from '@/views/Register.vue'
import Login from '@/views/Login.vue'
import Users from '@/views/Users.vue'
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
    },{
      path : '/registro',
      name : 'Registro',
      component : Register
    },{
      path : '/login',
      name : 'Login',
      component : Login
    },{
       path : '/usuarios',
      name : 'Usuarios',
      component : Users
    }
    
    
  ],
})

export default router

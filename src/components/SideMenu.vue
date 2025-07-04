<template>
  

        <v-app-bar color="primary">
          <v-app-bar-nav-icon v-if="$route.path!='/login'" variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
  
          <v-toolbar-title>Placeholder</v-toolbar-title>
  
  
        </v-app-bar>
  
        <v-navigation-drawer
          v-model="drawer"
          :location="$vuetify.display.mobile ? 'bottom' : undefined"
          temporary
        >

          <v-list>         
              <v-list-item title="DashBoard" to="/"/>
            <v-list-item title="Proveedores" to="/materiaPrima/proveedores"/>
            <v-list-item title="Categorias y unidades" to="/materiaPrima/categorias&unidades"/>
            <v-list-item title="Materia Prima" to="/materiaPrima"/>
            <v-list-item title="Usuarios" to="/usuarios"/>

           

        </v-list>

          <v-list >
             <v-list-item title="Salir" @click="logout()"> 
              
            </v-list-item>
          </v-list>
        
        </v-navigation-drawer>
     
</template>
<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
 const drawer = ref(false)
  const group = ref(null)

  watch(group, () => {
    drawer.value = false
  })
  function logout(){
    localStorage.clear('accessToken')
     localStorage.clear('refreshToken')
    router.push('/login')
  }
</script>
<template>
  

        <v-app-bar color="primary">
          <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
  
          <v-toolbar-title>Placeholder</v-toolbar-title>
  
  
          <v-btn icon="mdi-dots-vertical" variant="text"></v-btn>
        </v-app-bar>
  
        <v-navigation-drawer
          v-model="drawer"
          :location="$vuetify.display.mobile ? 'bottom' : undefined"
          temporary
        >
          <v-list>
            <v-list-item title="Proveedores" to="/proveedores">

            </v-list-item>
        </v-list>
        </v-navigation-drawer>
     
</template>
<script setup>
import { ref, watch } from 'vue'


 const drawer = ref(false)
  const group = ref(null)

  watch(group, () => {
    drawer.value = false
  })
</script>
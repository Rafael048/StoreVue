<script setup>
import {  RouterView } from 'vue-router'
import SideMenu from './components/SideMenu.vue';
</script>

<template >
  <v-app >
     <v-container  max-width="100%">
       <SideMenu/>
      <v-main min-height="100%">
        <RouterView />
      </v-main>
     </v-container>
  </v-app>
</template>

<style scoped>

</style>

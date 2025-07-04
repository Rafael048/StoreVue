<script setup>
import Header from '../components/Header.vue';
import Table from '@/components/Table.vue';
import { useUserStore } from '@/stores/UserStore';
import { onMounted } from 'vue';
import Notifications from '@/components/Notifications.vue';
import { useRouter } from 'vue-router';
import AddItems from '@/components/AddItems.vue';
const UserStore = useUserStore()
const router = useRouter()
const headers = [{
  key : 'nombre',
  title : 'Nombre',
  align : 'start',
  
},{
  key : 'apellido',
  title : 'Apellido',
  align : 'start'
},{
  key : 'username',
  title : 'Usuario',
  align : 'start'
},{
  key : 'rol',
  title : 'Rol',
  align : 'start'
},{
  key : 'actions',
  title : 'Acciones',
  sortable : false,
  align : 'end'
}
]
const formFields =[{
  key : 'nombre',
  label : 'Nombre',
  type : 'text',
  
},{
  key : 'apellido',
  label : 'Apellido',
  type : 'text'
},{
  key : 'username',
  label : 'Usuario',
  type : 'text'
},{
  key : 'rol',
  label : 'Rol',
  type : 'select',
  options : ['Administrador', 'Gerente', 'Vendedor', 'SuperAdmin']
}
]

const nameView = 'Usuarios' 
onMounted(async()=>{
  await UserStore.getData()
})

</script>

<template>
  <v-card class="ma-0 pa-0" >
      <Header
      :nameView="nameView"
      >
      </Header>
      <v-btn :prepend-icon="!$vuetify.display.xs?'mdi-plus':''"  @click="()=>router.push('/registro')" class="ma-3" variant="tonal" color="primary" align="center" rounded="xs">
    <v-icon icon="mdi-plus" v-if="$vuetify.display.xs"></v-icon>
   {{ !$vuetify.display.xs?`Registrar Usuarios`: null}}
 </v-btn>
    <AddItems
    :store="UserStore"
        :headers="headers"
        :nameView = nameView
        :formFields = formFields

    />
      <v-card-item>
        <Table 
        :store="UserStore"
        :headers="headers"
        :nameView = nameView
/>

      </v-card-item>
      
  </v-card>
  <Notifications
    :store="UserStore"
  ></Notifications>

</template>

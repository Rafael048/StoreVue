<script setup>
import Header from '../components/Header.vue';
import AddItems from '@/components/AddItems.vue';
import Table from '@/components/Table.vue';
import { useSupplierStore } from '@/stores/SupplierStore';
import { onMounted } from 'vue';
import Notifications from '@/components/Notifications.vue';
const SupplierStore = useSupplierStore()

const headers = [{
  key : 'nombre',
  title : 'Nombre',
  align : 'start',
  
},{
  key : 'codigo',
  title : 'Código',
  align : 'start'
},{
  key : 'telefonoVista',
  title : 'Telefono',
  align : 'start'
},{
  key : 'actions',
  title : 'Acciones',
  sortable : false,
  align : 'end'
}
]
const formFields = [{
  type : 'text',
  label : 'Nombre',
  required: true,
  key : 'nombre'
},{
  type : 'text',
  label : 'Codigo',
  required: true,
  key : 'codigo'
},{
  type : 'number',
  label : 'Telefono',
  required: true,
  key : 'telefono',
  subType : 'select',
  subLabel : 'Código',
  subKey : 'codigoTel',
  options : ['0412','0414']
},]
const nameView = 'Proveedores' 
onMounted(async()=>{
  await SupplierStore.getData()
})

</script>

<template>
  <v-card class="ma-0 pa-0" >
      <Header
      :nameView="nameView"
      >
      </Header>
      <AddItems
      :store = SupplierStore
      :formFields = formFields
      :nameView = nameView
      />
      <v-card-item>
        <Table 
        :store="SupplierStore"
        :headers="headers"
        :nameView = nameView
/>

      </v-card-item>
      
  </v-card>
  <Notifications
    :store="SupplierStore"
  ></Notifications>

</template>

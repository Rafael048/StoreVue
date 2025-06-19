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
  title : 'Nombre'
},{
  key : 'codigo',
  title : 'Código'
},{
  key : 'telefonoVista',
  title : 'Telefono'
},{
  key : 'actions',
  title : 'Acciones',
  sortable : false,
  aling : 'end'
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
  subKey : 'codigoTel'
},]
const nameView = 'Proveedores' 
onMounted(async()=>{
  await SupplierStore.getData()
  console.log(SupplierStore.items)
})

</script>

<template>
  <v-card class="ma-0 pa-0" >
      <Header>
      </Header>
      <AddItems
      :store = SupplierStore
      :formFields = formFields
      :nameView = nameView
      />
      <v-card-item>
        <Table 
        :store="SupplierStore"
        :headers="headers"/>

      </v-card-item>
      
  </v-card>
  <Notifications
    :store="SupplierStore"
  ></Notifications>

</template>

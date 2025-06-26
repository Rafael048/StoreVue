<script setup>
import Header from '../components/Header.vue';
import AddItems from '@/components/AddItems.vue';
import Table from '@/components/Table.vue';
import { useRawMaterialStore } from '@/stores/RawMaterial';
import { useSupplierStore } from '@/stores/SupplierStore';
import { useUnitStore } from '@/stores/UnitStore';
import { useCategorieStore } from '@/stores/CategoriesStore';
import { useRawMaterialInventoryStore } from '@/stores/RawMaterialInventory';
import { computed, onMounted } from 'vue';
import Notifications from '@/components/Notifications.vue';
const RawMaterialStore = useRawMaterialStore()
const RawMaterialInventoryStore = useRawMaterialInventoryStore()
const SupplierStore = useSupplierStore()
const UnitStore = useUnitStore()
const CategoriesStore = useCategorieStore()
const suppliers = computed(()=>SupplierStore.items)
const units = computed(()=>UnitStore.items)
const categories = computed(()=>CategoriesStore.items)
const rawMaterial = computed(()=>RawMaterialStore.items)
const headers = [{
  key : 'nombre',
  title : 'Nombre',
  align : 'center',
  
},{
  key : 'precio',
  title : 'Precio',
  align : 'center'
},{
  key : 'categoria',
  title : 'Categoría',
  align : 'center'
},{
  key : 'proveedor',
  title : 'Proveedor',
  align : 'center'
},{
  key : 'unidad',
  title : 'Unidad de medida',
  align : 'center'
},{
  key : 'inventario.cantidad',
  title : 'Cantidad en stock',
  align : 'center'
},{
  key : 'actions',
  title : 'Acciones',
  sortable : false,
  align : 'end'
}
]
const formFields = computed(()=>[{
  key : 'nombre',
  label : 'Nombre',
  type : 'text',
  
},{
  key : 'precio',
  label : 'Precio',
  type : 'number'
},{
  key : 'categoria',
  label : 'Categoría',
  type : 'select',
  options : categories.value
},{
  key : 'proveedor',
  label : 'Proveedor',
  type : 'select',
  options : suppliers.value
},{
  key : 'unidad',
  label : 'Unidad de medida',
  type : 'select',
  options : units.value
}])
const formFieldsInventory = computed(()=>
  [{
  key : 'materiaPrima',
  label : 'Materia prima',
  type : 'select',
  options : rawMaterial.value
},{
  key : 'cantidad',
  label : 'Cantidad',
  type : 'number'
}]
)
const nameView = 'Materia Prima'
const nameViewInventory = 'Inventario' 

onMounted(async()=>{
    await SupplierStore.getData()
    await CategoriesStore.getData()
    await UnitStore.getData()
    await RawMaterialStore.getData()
})

</script>

<template>
  <v-card class="ma-0 pa-0"  >
      <Header
      :nameView="nameView"
      >
      </Header>
      <v-row :justify="$vuetify.display.xs?'center':'start'" class="ma-1">
        <AddItems
        :store = RawMaterialStore
        :formFields = formFields
        :nameView = nameView
        />
        <AddItems
        :store = RawMaterialInventoryStore
        :formFields = formFieldsInventory
        :nameView = nameViewInventory
        />
      </v-row>
      <v-card-item>
        <Table 
        :store="RawMaterialStore"
        :headers="headers"

        />
        
      </v-card-item>
      
  </v-card>
  <Notifications
    :store="RawMaterialStore"
  ></Notifications>
   <Notifications
    :store="RawMaterialInventoryStore"
  ></Notifications>

</template>

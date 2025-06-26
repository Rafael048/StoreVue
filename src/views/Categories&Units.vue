<script setup>
import Header from '../components/Header.vue';
import AddItems from '@/components/AddItems.vue';
import Table from '@/components/Table.vue';
import { useCategorieStore } from '@/stores/CategoriesStore';
import { useUnitStore } from '@/stores/UnitStore';
import { onMounted } from 'vue';
import Notifications from '@/components/Notifications.vue';
const CategoriesStore = useCategorieStore()
const UnitStore = useUnitStore()
const headersCat = [{
  key : 'nombre',
  title : 'Nombre',
  align : 'start'
},{
  key : 'actions',
  title : 'Acciones',
  sortable : false,
  align : 'end'
}
]
const headersUnit = [{
  key : 'nombre',
  title : 'Nombre',
  align: 'start'
},{
  key : 'tipo',
  title : 'Tipo',
  align : 'start'
},{
  key : 'factorBase',
  title : 'Factor de conversión',
  align : 'start'
},{
  key : 'actions',
  title : 'Acciones',
  sortable : false,
  align : 'end'
}
]
const formFieldsCat = [{
  type : 'text',
  label : 'Nombre',
  required: true,
  key : 'nombre'
},]
const formFieldsUnit = [{
  type : 'text',
  label : 'Nombre',
  required: true,
  key : 'nombre'
},{
  key : 'tipo',
  label : 'Tipo',
  type : 'select',
  options: ['Masa','Volumen','Longitud','Unidad'],
  required: true,

},{
  key : 'factorBase',
  label : 'Factor de conversión',
  type : 'number',
  required: true,

},]
const nameViewCat = 'Categorías' 
const nameViewUnit = 'Unidades'
onMounted(async()=>{
  await CategoriesStore.getData()
  await UnitStore.getData()

})

</script>

<template>
  <v-card class="ma-0 pa-0" flat >
    <v-row>
      <v-col :cols="$vuetify.display.xs?'12':'6'">

        <v-card  elevation="8" class="ma-3" height="95%" >
  
          <Header
             :nameView="nameViewCat"
          >
          </Header>
          <AddItems
          :store = CategoriesStore
          :formFields = formFieldsCat
          :nameView = nameViewCat
          />
          <v-card-item>
            <Table 
            :store="CategoriesStore"
            :headers="headersCat"/>
    
          </v-card-item>
        </v-card>
      </v-col>
      <v-col :cols="$vuetify.display.xs?'12':'6'">

        <v-card  elevation="8" class="ma-3"  height="95%">
            
          <Header
             :nameView="nameViewUnit"
          >
          </Header>
          <AddItems
          :store = UnitStore
          :formFields = formFieldsUnit
          :nameView = nameViewUnit
          />
          <v-card-item>
            <Table 
            :store="UnitStore"
            :headers="headersUnit"/>
    
          </v-card-item>
          </v-card>
      </v-col>
    </v-row>
          
            
</v-card>
  <Notifications
    :store="CategoriesStore"
  ></Notifications>
   <Notifications
    :store="UnitStore"
  ></Notifications>

</template>

<template>
    <v-card border>
        <v-text-field v-model="search" variant="outlined" class="ma-3 " :label="`Buscar`" prepend-inner-icon="mdi-magnify">
           
        </v-text-field>
            <v-data-table :items="store.items" :headers="headers" :loading="store.loading" :search="search" items-per-page-text="Elementos" :header-props="{class : 'text-h6'}"
  >
                <template v-slot:item.actions="{item}" class="aling-end">
                    <v-menu>
                           <template v-slot:activator="{ props }">
                <v-btn variant="text" title="Acciones" icon="mdi-dots-vertical" v-bind="props"></v-btn>
              </template>
              

              <v-list>
                  <v-btn  variant="text"
                icon="mdi-pencil" value="edit" color="edit" title="Modificar" @click="store.edit(item)"></v-btn>
                 <v-btn  variant="text"
                icon="mdi-delete" value="eliminate" color="red" title="Eliminar" @click="deleteItem(item)"></v-btn>
              </v-list>
                    </v-menu>
                </template>
                <template v-slot:item.precio_promedio="{item}">
                    <p >
                      ${{ item.precio_promedio }}
                    </p>
              </template>
               <template v-slot:item.inventario="{item}">
                   <v-icon icon="mdi-store-settings" @click="subTableCall(item.id)"/>
              </template>
                <template v-slot:item.inventario.cantidad="{item}">
                    <p :class="item.inventario.cantidad>10?'text-green':'text-red'">
                      {{ item.inventario.cantidad }}
                    </p>
              </template>
        </v-data-table>
    </v-card>
        <v-dialog v-model="store.showDialogDelete"  :max-width="$vuetify.display.xs?'100%':'500px'">
        <v-card>
            <v-card-title :class="$vuetify.display.smAndDown?'text-body-2 pa-3':'pa-3'">
                {{ '¿Realmente desea eliminar este elemento?' }}
            </v-card-title>
               
                <v-card-actions :class="$vuetify.display.smAndDown?'text-body-2':''">
                    <v-btn @click="()=>store.showDialogDelete=!store.showDialogDelete">
                        Cancelar
                    </v-btn>
                    <v-btn @click="()=>props.store.removeItem(itemToDelete)" class="bg-red" :loading="store.buttonLoading">
                        Aceptar
                    </v-btn>
                </v-card-actions>
        </v-card>
    </v-dialog>
    <SubTable v-if="props.subStore"
      :store="props.subStore"
      :headers="props.subHeader"
      :items="subItems"
      "/>
</template>
<script setup>
import { ref,computed } from 'vue'
import SubTable from '@/components/SubTable.vue'
const itemToDelete = ref('')
const search = ref('')
const subItems = computed(()=>props.subStore.items)
const props = defineProps({
    store: Object,
    headers : Array,
    nameView: String,
    subStore: {type:Object, default: null},
    subHeader: {type: Array, default: ()=>[]}
})
async function subTableCall(id){
    await props.subStore.getData(id)    
    props.subStore.subTable = true
}
function deleteItem(item){
  props.store.showDialogDelete = true
 itemToDelete.value = item
}
</script>
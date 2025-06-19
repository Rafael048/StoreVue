<template>
            <v-data-table :items="store.items" :headers="headers" >
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
        </v-data-table>
        <v-dialog v-model="store.showDialogDelete"  :max-width="$vuetify.display.xs?'100%':'500px'">
        <v-card>
            <v-card-title :class="$vuetify.display.smAndDown?'text-body-2 pa-3':'pa-3'">
                {{ '¿Realmente desea eliminar este elemento?' }}
            </v-card-title>
               
                <v-card-actions :class="$vuetify.display.smAndDown?'text-body-2':''">
                    <v-btn @click="()=>store.showDialogDelete=!store.showDialogDelete">
                        Cancelar
                    </v-btn>
                    <v-btn @click="()=>props.store.removeItem(itemToDelete)" class="bg-red">
                        Aceptar
                    </v-btn>
                </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script setup>
import { ref } from 'vue'
const itemToDelete = ref('')
const props = defineProps({
    store: Object,
    headers : Array
})
function deleteItem(item){
  props.store.showDialogDelete = true
 itemToDelete.value = item
}
</script>
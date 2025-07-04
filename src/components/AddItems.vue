<template>
 <v-btn v-if="nameView!='Usuarios'" :prepend-icon="!$vuetify.display.xs?nameView==='Inventario'?'mdi-store-plus':'mdi-plus':''"  @click="props.store.add()" class="ma-3" variant="tonal" color="primary" align="center" rounded="xs">
    <v-icon :icon="nameView==='Inventario'?'mdi-store-plus':'mdi-plus'" v-if="$vuetify.display.xs"></v-icon>
   {{ !$vuetify.display.xs?`Agregar ${nameView}`: null}}
 </v-btn>

 <v-dialog v-model="props.store.showDialog" :max-width="$vuetify.display.xs?'100%':'500px'">
    <v-card  :class="$vuetify.display.smAndDown?'text-body-2 pa-3':'pa-3'">
        <v-card-title class="text-center">
            {{ `${store.isEdit?'Editar':'Agregar'} ${props.nameView}` }}
        </v-card-title>
            <template v-for="field in props.formFields">
                <template v-if="field.subType">
                    <v-row>

                        <v-col :cols="$vuetify.display.smAndDown?'5':'4'">
                            <template v-if="field.subType!='select'">
                                <v-text-field variant="outlined" :type="field.subType" :label="field.subLabel" :required="field.required" v-model="props.store.data[field.subKey]">
        
                                </v-text-field>
                            </template>
                            <template v-else>
                                <v-autocomplete variant="outlined" :type="field.subType" :label="field.subLabel" :required="field.required" v-model="props.store.data[field.subKey]" :items="field.options">
        
                                </v-autocomplete>
                            </template>
                        </v-col>
                        <v-col :cols="$vuetify.display.smAndDown?'7':'8'">
                            <v-text-field variant="outlined" :type="field.type" :label="field.label" :required="field.required" v-model="props.store.data[field.key]">
    
                            </v-text-field>
                        </v-col>
                    </v-row>
                </template>
                <template v-else>
                    <v-text-field variant="outlined" :type="field.type" :label="field.label" :required="field.required" v-model="props.store.data[field.key]" v-if="field.type!='select'&&!(field.key==='factorBase'&&store.data.tipo==='Unidad')" @blur="field.type==='number'?notNegative(props.store.data[field.key],field.key):null ">
                    </v-text-field>
                    <v-autocomplete variant="outlined"  :label="field.label" :required="field.required" v-model="props.store.data[field.key]" :items="field.options" v-else-if="field.type==='select'&&!(field.key==='materiaPrima'&&store.isEdit)" item-value="id" item-title="nombre" :return-object="field.key==='materiaPrima'||field.key==='unidadInv'" >
    
                    </v-autocomplete>

                </template>

            </template>
        <v-card-actions>
            <v-btn @click="props.store.save()" class="bg-success" :loading="store.buttonLoading">
                Guardar
            </v-btn>
        </v-card-actions>
    </v-card>
 </v-dialog>
</template>
<script setup>
    const props = defineProps({
        store : Object,
        formFields : Array,
        nameView : String
    })
    function notNegative(number, key){
        if(number<0){
            props.store.data[key] = 0
        }
    }
</script>
<style scoped>

</style>
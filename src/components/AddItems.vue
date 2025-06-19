<template>
 <v-btn @click="props.store.add()">
    Agregar 
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
                                <v-autocomplete variant="outlined" :type="field.subType" :label="field.subLabel" :required="field.required" v-model="props.store.data[field.subKey]" :items="['412','414']">
        
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
                    <v-text-field variant="outlined" :type="field.type" :label="field.label" :required="field.required" v-model="props.store.data[field.key]">
                    </v-text-field>

                </template>

            </template>
        <v-card-actions>
            <v-btn @click="props.store.save()" class="bg-success">
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
</script>
<style scoped>

</style>
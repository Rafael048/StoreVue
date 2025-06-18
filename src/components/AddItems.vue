<template>
 <v-btn @click="props.store.add()">
    Agregar 
 </v-btn>

 <v-dialog v-model="props.store.addModal" max-width="50%">
    <v-card :title="`Agregar ${props.nameView}`">
        <v-form>
            <template v-for="field in props.formFields">
                <template v-if="field.subType">
                    <v-row>

                        <v-col cols="4">
                            <template v-if="field.subType!='select'">
                                <v-text-field :type="field.subType" :label="field.subLabel" :required="field.required" v-model="props.store.data[field.subKey]">
        
                                </v-text-field>
                            </template>
                            <template v-else>
                                <v-autocomplete :type="field.subType" :label="field.subLabel" :required="field.required" v-model="props.store.data[field.subKey]" :items="['412','414']">
        
                                </v-autocomplete>
                            </template>
                        </v-col>
                        <v-col cols="8">
                            <v-text-field :type="field.type" :label="field.label" :required="field.required" v-model="props.store.data[field.key]">
    
                            </v-text-field>
                        </v-col>
                    </v-row>
                </template>
                <template v-else>
                    <v-text-field :type="field.type" :label="field.label" :required="field.required" v-model="props.store.data[field.key]">
                    </v-text-field>

                </template>

            </template>
            <v-btn @click="props.store.save()">
                Guardar
            </v-btn>
        </v-form>
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
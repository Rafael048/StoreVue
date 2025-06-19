<template>
    <v-dialog v-model="props.store.notificationDialog"  max-width="400px">
        <v-card :class="props.store.notification.type==='Error'?'bg-red':'bg-green'">
            <v-card-title>
                {{ props.store.notification.title }}
            </v-card-title>
                <v-card-text>
                    {{ props.store.notification.messages }}
                </v-card-text>
                <v-card-actions>
                    <v-btn @click="()=>props.store.notificationDialog = false">
                        Aceptar
                    </v-btn>
                </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script setup>
import {  watch } from 'vue';

    const props = defineProps({
        store : Object
    })

watch(()=>props.store.notificationDialog,(newVal)=>{
        if(newVal===true){
            setTimeout(() => {
               props.store.notificationDialog = false
            }, 2000);
        }       
    })
</script>
<style scoped>

</style>
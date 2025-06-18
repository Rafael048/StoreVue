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
                    <v-btn @click="()=>props.store.notificationDialog = !props.store.notificationDialog">
                        Aceptar
                    </v-btn>
                </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script setup>
    const props = defineProps({
        store : Object
    })
</script>
<style scoped>

</style>
<template>
<v-card class="d-flex align-center justify-center"   height="85vh" flat>
    <v-card :class="!$vuetify.display.xs? $vuetify.display.mdAndDown? 'bg-white w-50':'bg-white w-25':'bg-white w-100'" elevation="16" >
        <v-card-title class="text-center">
            Iniciar sesión
        </v-card-title>
     
 
        <v-text-field v-model="data.username" :class="!$vuetify.display.xs?'pa-2':''" variant="outlined" required label="Usuario"></v-text-field>
        <v-text-field v-model="data.password" :class="!$vuetify.display.xs?'pa-2':''" variant="outlined" required type="password" label="Contraseña" ></v-text-field>
       <v-card-actions class="d-flex justify-end">
                    <v-btn color="green" variant="tonal" @click="save()">
                        Aceptar
                    </v-btn>
         </v-card-actions> 
    </v-card>
</v-card>
 <v-dialog v-model="notificationDialog"  max-width="400px">
        <v-card :class="notification.type==='Error'?'bg-red':'bg-green'">
            <v-card-title>
                {{ notification.title }}
            </v-card-title>
                <v-card-text>
                    {{ notification.messages }}
                </v-card-text>
                <v-card-actions>
                    <v-btn @click="()=>notificationDialog = false" :loading="buttonLoading">
                        Aceptar
                    </v-btn>
                </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script setup>
import { ref,watch } from 'vue';
import { apiCall } from '../../utils/apiCall';
import validate from '../../utils/validateInfo';
import { useRouter } from 'vue-router';
const router = useRouter()
const data = ref({
    
    username: '',
    password: '',
})
const buttonLoading = ref(false)
const notification = ref({})
const notificationDialog = ref(false)
async function save() {
    buttonLoading.value = true
    const dataValues = Object.values(data.value)
    const errors = validate(dataValues)
    if(errors.length>0){
        notification.value = {
            title : 'Datos incompletos',
            messages : 'No se pueden enviar datos vacios',
            type : 'Error'
        }
        notificationDialog.value = true
        buttonLoading.value = false

        return
    }else{
        const obj = {  
           username : data.value.username,
           password : data.value.password,
        }
        const result = await apiCall('usuarios/login/','POST', obj)
        if(result.status!=200){
            if(result.status==404){
                notification.value = {
            title : 'Error en el servidor',
            messages : 'Usuario no encontrado',
            type : 'Error'
            
        }
            }else{

                notification.value = {
               title : 'Error en el servidor',
               messages : result.data.error,
               type : 'Error'
               
           }
            }
            notificationDialog.value = true
            buttonLoading.value = false

            return

        }else{
            notification.value = {
            title : 'Ingreso completado',
            messages : `Se ha iniciado sesión con el usuario ${obj.username}`,
            type : 'Success'
        }
        notificationDialog.value = true
        }
        }
        buttonLoading.value = false

        data.value= {
   
    username: '',
    password: '',

    
     }
     router.push('/')
    
}
watch(()=>notificationDialog.value,(newVal)=>{
        if(newVal===true){
            setTimeout(() => {
               notificationDialog.value = false
            }, 2000);
        }       
    })
</script>
<style scoped>
</style>
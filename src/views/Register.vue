<template>
<v-card class="d-flex align-center justify-center"   height="85vh" flat>
    <v-card :class="!$vuetify.display.xs?'bg-white w-25':'bg-white w-100'" elevation="16">
        <h1 class="text-center">
            Registrar usuarios
        </h1>
        <v-row v-if="!$vuetify.display.xs">

            <v-col cols="6" v-if="!$vuetify.display.xs">
                <v-text-field v-model="data.nombre" :class="!$vuetify.display.xs?'pa-2':''" variant="outlined" required label="Nombre"  ></v-text-field>
            </v-col>
            <v-col cols="6" v-if="!$vuetify.display.xs">
    
                <v-text-field v-model="data.apellido" :class="!$vuetify.display.xs?'pa-2':''" variant="outlined" required label="Apellido" ></v-text-field>
            </v-col>
        </v-row>
        <v-text-field v-model="data.nombre" :class="!$vuetify.display.xs?'pa-2':''" variant="outlined" required v-if="$vuetify.display.xs" label="Nombre"></v-text-field>
        <v-text-field v-model="data.apellido" :class="!$vuetify.display.xs?'pa-2':''" variant="outlined" required v-if="$vuetify.display.xs" label="Apellido"></v-text-field>

        <v-text-field v-model="data.username" :class="!$vuetify.display.xs?'pa-2':''" variant="outlined" required label="Usuario"></v-text-field>
        <v-text-field v-model="data.password" :class="!$vuetify.display.xs?'pa-2':''" variant="outlined" required type="password" label="Contraseña" ></v-text-field>
        <v-autocomplete v-model="data.rol" :class="!$vuetify.display.xs?'pa-2':''" variant="outlined" required :items="['Administrador', 'Gerente', 'Vendedor', 'SuperAdmin']" label="Rol" ></v-autocomplete>
       <v-card-actions class="d-flex justify-end">
                    <v-btn color="green" variant="tonal" @click="save()" :loading="buttonLoading">
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
                    <v-btn @click="()=>notificationDialog = false" >
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
    nombre:'',
    apellido:'',
    username: '',
    password: '',
    rol: ''
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
            nombre : data.value.nombre,
           apellido : data.value.apellido,
           username : data.value.username,
           password : data.value.password,
           rol : data.value.rol
        }
        console.log(obj)
        const result = await apiCall('usuarios/registro/','POST', obj)
        if(result.status!=201){
             notification.value = {
            title : 'Error en el servidor',
            messages : result.statusText,
            type : 'Error'
            
        }
            notificationDialog.value = true
                    buttonLoading.value = false

            return

        }else{
            notification.value = {
            title : 'Registro completado',
            messages : `Se ha registrado el usuario ${obj.username}`,
            type : 'Success'
        }
        notificationDialog.value = true
        }
        }
        buttonLoading.value = false

        data.value= {
     nombre:'',
    apellido:'',
    username: '',
    password: '',
    rol: ''
    
     }
     router.push('/usuarios')
    
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
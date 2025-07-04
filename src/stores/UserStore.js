import { defineStore } from "pinia";
import { ref } from "vue";
import { apiCall } from "../../utils/apiCall";
import validate from "../../utils/validateInfo";
import dataComprobation from "../../utils/DataComprobation";
export const useUserStore = defineStore('User',()=>{
const comprobations = dataComprobation()
const items = ref([])
const data = ref({
    nombre:'',
    apellido:'',
    username: '',
    rol: ''
})
const loading = ref(true)
const dataEdit = ref({})
const showDialog = ref(false)
const showDialogDelete = ref(false)
const notificationDialog = ref(false)
const notification = ref({})
const isEdit = ref(false)
const buttonLoading = ref(false)

async function getData() {
    const result = await apiCall('usuarios/usuarios')
    if(result.status!=200){
        console.error(result.statusText)
    }else{
        
        items.value = result.data
    }
    loading.value = false
}

function edit(item){
    dataEdit.value = {...item}
     data.value = {
            nombre : item.nombre,
           apellido : item.apellido,
           username : item.username,
           rol : item.rol
        
    }
    console.log(data.value, dataEdit.value)

    isEdit.value = true
    showDialog.value = true
}
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
        console.log(dataValues)
        const obj = comprobations.sameData(dataEdit.value,data.value)
        console.log(obj)
            if(Object.getOwnPropertyNames(obj).length === 0){
                   notification.value = {
            title : 'Datos sin modificar',
            messages : 'No se detectaron cambios en los datos.',
            type : 'Error'
        }
        notificationDialog.value = true
                        buttonLoading.value = false

        return
            }else{
                const result = await apiCall(`usuarios/usuarios/${dataEdit.value.id}/`,'PATCH', obj)
                if(result.status!=200){
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
            title : 'Edición completada',
            messages : `Se ha modificado el usuario ${dataEdit.value.nombre}`,
            type : 'Success'
        }
        notificationDialog.value = true
                }
            }
       buttonLoading.value = false

    data.value = {
    nombre:'',
    apellido:'',
    username: '',
    rol: ''
}
    await getData()
    showDialog.value = false
    }
}
async function removeItem(item) {
    const obj = {
        activo : false
    }
    const result = await apiCall(`usuarios/usuarios/${item.id}/`,'PATCH', obj)
    console.log(result)
    if(result.status!=200){
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
            title : 'Eliminacion completada',
            messages : `Se ha eliminado el usuario ${item.nombre}`,
            type : 'Success'
        }
        notificationDialog.value = true
                buttonLoading.value = false

        }
    showDialogDelete.value = false
    await getData()
}

return{
    getData, items,showDialog, data,save, notification, notificationDialog, edit , isEdit, dataEdit, removeItem, showDialogDelete,loading, buttonLoading
}
})

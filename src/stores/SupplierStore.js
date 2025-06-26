import { defineStore } from "pinia";
import { ref } from "vue";
import { apiCall } from "../../utils/apiCall";
import validate from "../../utils/validateInfo";
import dataComprobation from "../../utils/DataComprobation";
export const useSupplierStore = defineStore('Supplier',()=>{
const comprobations = dataComprobation()
const items = ref([])
const data = ref({
    nombre : '',
    codigo : '',
    telefono : '',
    codigoTel : ''
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
    const result = await apiCall('materiaPrima/proveedor')
    if(result.status!=200){
        console.error(result.statusText)
    }else{
        result.data.forEach(supplier => {
           supplier.telefonoVista =supplier.codigoTel + '-' +supplier.telefono
        });
        items.value = result.data
    }
    loading.value = false
}
function add(){
    data.value = {
        nombre : '',
        codigo : '',
        telefono : '',
        codigoTel : ''

    }
    showDialog.value = true
}
function edit(item){
    dataEdit.value = {...item}
     data.value = {
        nombre : item.nombre,
        codigo : item.codigo,
        telefono : item.telefono,
        codigoTel : item.codigoTel

    }
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
       
       if(!comprobations.isPhoneNumber(data.value.telefono)){
        notification.value = {
            title : 'Formato incorrecto',
            messages : 'Los números de télefono deben ser de 8 digítos',
            type : 'Error'
        }
        notificationDialog.value = true
                buttonLoading.value = false

        return
       }

        if(isEdit.value){
            const obj = comprobations.sameData(dataEdit.value,data.value)
            if(Object.getOwnPropertyNames(obj).length === 0){
                   notification.value = {
            title : 'Datos sin modificar',
            messages : 'No se dectaron cambios en los datos.',
            type : 'Error'
        }
        notificationDialog.value = true
        return
            }else{
                const result = await apiCall(`materiaPrima/proveedor/${dataEdit.value.id}/`,'PATCH', obj)
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
            messages : `Se ha modificado el proveedor ${obj.nombre}`,
            type : 'Success'
        }
        notificationDialog.value = true
                }
            }
        }else{
             const obj = {
            nombre : data.value.nombre,
            codigo : data.value.codigo,
            telefono : data.value.telefono,
            codigoTel : data.value.codigoTel
        }
        const result = await apiCall('materiaPrima/proveedor/','POST', obj)
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
            messages : `Se ha registrado el proveedor ${obj.nombre}`,
            type : 'Success'
        }
        notificationDialog.value = true
        }
        }
               buttonLoading.value = false

        data.value= {
    nombre : '',
    codigo : '',
    telefono : '',
    codigoTel : ''
    }
    await getData()
    showDialog.value = false
    }
}
async function removeItem(item) {
    const obj = {
        eliminado : true
    }
    const result = await apiCall(`materiaPrima/proveedor/${item.id}/`,'PATCH', obj)
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
            messages : `Se ha eliminado el proveedor ${item.nombre}`,
            type : 'Success'
        }
        notificationDialog.value = true
                buttonLoading.value = false

        }
    showDialogDelete.value = false
    await getData()
}

return{
    getData, items,showDialog,add, data,save, notification, notificationDialog, edit , isEdit, dataEdit, removeItem, showDialogDelete,loading, buttonLoading
}
})

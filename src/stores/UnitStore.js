import { defineStore } from "pinia";
import { ref } from "vue";
import { apiCall } from "../../utils/apiCall";
import validate from "../../utils/validateInfo";
import dataComprobation from "../../utils/DataComprobation";
export const useUnitStore = defineStore('Units',()=>{
const comprobations = dataComprobation()
const items = ref([])
const data = ref({
    nombre : '',
     tipo: '',
    factorBase: ''
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
    const result = await apiCall('materiaPrima/unidades')
    if(result.status!=200){
        console.error(result.statusText)
    }else{
        items.value = result.data
    }
    loading.value = false
}
function add(){
    data.value = {
        nombre : '',
        tipo: '',
        factorBase: ''
    }
    showDialog.value = true
}
function edit(item){
    dataEdit.value = {...item}
     data.value = {
        nombre : item.nombre,
        tipo: item.tipo,
        factorBase: item.factorBase
    }
    isEdit.value = true
    showDialog.value = true
}
async function save() {
    buttonLoading.value = true
    if(data.value.tipo==='Unidad'){
        data.value.factorBase = 1
    }
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
        if(isEdit.value){
            const obj = comprobations.sameData(dataEdit.value,data.value)
            if(Object.getOwnPropertyNames(obj).length === 0){
                   notification.value = {
            title : 'Datos sin modificar',
            messages : 'No se dectaron cambios en los datos.',
            type : 'Error'
        }
        notificationDialog.value = true
        buttonLoading.value = false
        return
            }else{
                const result = await apiCall(`materiaPrima/unidades/${dataEdit.value.id}/`,'PATCH', obj)
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
            messages : `Se ha modificado la unidad ${obj.nombre}`,
            type : 'Success'
        }
        notificationDialog.value = true
                        buttonLoading.value = false

                }
            }
        }else{
             const obj = {
            nombre : data.value.nombre,
            tipo: data.value.tipo,
            factorBase: data.value.factorBase
        }
        const result = await apiCall('materiaPrima/unidades/','POST', obj)
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
            messages : `Se ha registrado la unidad ${obj.nombre}`,
            type : 'Success'
        }
        notificationDialog.value = true
        }
        }
      buttonLoading.value = false
        data.value= {
    nombre : '',
    tipo: '',
    factorBase: ''
    }
    await getData()
    showDialog.value = false
    }
}
async function removeItem(item) {
    const obj = {
        eliminado : true
    }
    const result = await apiCall(`materiaPrima/unidades/${item.id}/`,'PATCH', obj)
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
            messages : `Se ha eliminado la unidad ${item.nombre}`,
            type : 'Success'
        }
        notificationDialog.value = true
        }
                buttonLoading.value = false

    showDialogDelete.value = false
    await getData()
}

return{
    getData, items,showDialog,add, data,save, notification, notificationDialog, edit , isEdit, dataEdit, removeItem, showDialogDelete, loading, buttonLoading
}
})

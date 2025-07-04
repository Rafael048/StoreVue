import { defineStore } from "pinia";
import { ref } from "vue";
import { apiCall } from "../../utils/apiCall";
import validate from "../../utils/validateInfo";
import dataComprobation from "../../utils/DataComprobation";
export const useRawMaterialStore = defineStore('RawMaterial',()=>{
const comprobations = dataComprobation()
const items = ref([])
const data = ref({
    nombre : '',
    unidad : '',
    proveedor : '',
    categoria : ''
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
    const result = await apiCall('materiaPrima/')
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
        unidad :'',
        proveedor : '',
        categoria : ''

    }
    showDialog.value = true
}

function edit(item){
    dataEdit.value = {...item}
     data.value = {
        nombre : item.nombre,
        unidad : item.unidad,
        proveedor : item.proveedor,
        categoria : item.categoria

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
                const result = await apiCall(`materiaPrima/${dataEdit.value.id}/`,'PATCH', obj)
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
            messages : `Se ha modificado la materia prima ${obj.nombre}`,
            type : 'Success'
        }
        notificationDialog.value = true
                }
            }
        }else{
             const obj = {
            nombre : data.value.nombre,
            unidad_id : data.value.unidad,
            proveedor_id : data.value.proveedor,
            categoria_id : data.value.categoria
        }
        const result = await apiCall('materiaPrima/','POST', obj)
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
            messages : `Se ha registrado la materia prima ${obj.nombre}`,
            type : 'Success'
        }
        notificationDialog.value = true
        }
        }
               buttonLoading.value = false

        data.value= {
    nombre : '',
    unidad : '',
    proveedor : '',
    categoria : ''
    }
    await getData()
    showDialog.value = false
    }
}
async function removeItem(item) {
    const obj = {
        eliminado : true
    }
    const result = await apiCall(`materiaPrima/${item.id}/`,'PATCH', obj)
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
            messages : `Se ha eliminado la materia prima ${item.nombre}`,
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

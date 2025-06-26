import { defineStore } from "pinia";
import { ref } from "vue";
import { apiCall } from "../../utils/apiCall";
import validate from "../../utils/validateInfo";
import dataComprobation from "../../utils/DataComprobation";
import { useRawMaterialStore } from "./RawMaterial";
export const useRawMaterialInventoryStore = defineStore('RawMaterialInventory',()=>{
const RawMaterialStore = useRawMaterialStore()
const comprobations = dataComprobation()
const items = ref([])
const data = ref({
    materiaPrima : '',
    cantidad : '',
    id : ''
})
const loading = ref(true)
const dataEdit = ref({})
const showDialog = ref(false)
const showDialogDelete = ref(false)
const notificationDialog = ref(false)
const notification = ref({})
const isEdit = ref(false)
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
    materiaPrima : '',
    cantidad : ''
}
    showDialog.value = true
}

function edit(item){
    dataEdit.value = {...item}
     data.value = {
    materiaPrima : '',
    cantidad : ''
}
    isEdit.value = true
    showDialog.value = true
}
async function save() {
    const dataValues = Object.values(data.value)

    const errors = validate(dataValues)
    if(errors.length>0){
        notification.value = {
            title : 'Datos incompletos',
            messages : 'No se pueden enviar datos vacios',
            type : 'Error'
        }
        notificationDialog.value = true
        return
    }else{
             const obj = {
                materiaPrima: data.value.materiaPrima.id,
                cantidad : data.value.cantidad
        }
        const result = await apiCall(`materiaPrima/inventario/${data.value.materiaPrima.inventario.id}/`,'PATCH', obj)
        console.log(result)
        if(result.status!=200){
             notification.value = {
            title : 'Error en el servidor',
            messages : result.statusText,
            type : 'Error'
            
        }
            notificationDialog.value = true
            return

        }else{
            notification.value = {
            title : 'Registro completado',
            messages : `Se ha modificado el inventario de la materia prima  ${data.value.materiaPrima.nombre}`,
            type : 'Success'
        }
        notificationDialog.value = true
        }
        
       
    data.value = {
    materiaPrima : '',
    cantidad : ''
}
    await RawMaterialStore.getData()
    showDialog.value = false
    }
}
// async function removeItem(item) {
//     const obj = {
//         eliminado : true
//     }
//     const result = await apiCall(`materiaPrima/${item.id}/`,'PATCH', obj)
//     if(result.status!=200){
//             notification.value = {
//             title : 'Error en el servidor',
//             messages : result.statusText,
//             type : 'Error'
            
//         }
//         notificationDialog.value = true
//         return
//         }else{
//           notification.value = {
//             title : 'Eliminacion completada',
//             messages : `Se ha eliminado la materia prima ${item.nombre}`,
//             type : 'Success'
//         }
//         notificationDialog.value = true
//         }
//     showDialogDelete.value = false
//     await getData()
// }

return{
    getData, items,showDialog,add, data,save, notification, notificationDialog, edit , isEdit, dataEdit, showDialogDelete, loading
}
})

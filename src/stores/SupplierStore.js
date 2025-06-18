import { defineStore } from "pinia";
import { ref } from "vue";
import { apiCall } from "../../utils/apiCall";
import validate from "../../utils/validateInfo";
export const useSupplierStore = defineStore('Supplier',()=>{

const items = ref([])
const data = ref({
    nombre : '',
    codigo : '',
    telefono : '',
    codigoTel : ''
})
const addModal = ref(false)
const notificationDialog = ref(false)
const notification = ref({})
async function getData() {
    const result = await apiCall('materiaPrima/proveedor')
    if(result.status!=200){
        console.error(result.statusText)
    }else{
        items.value = result.data
    }
}
function add(){
    data.value = {
        nombre : '',
        codigo : '',
        telefono : '',
        codigoTel : ''

    }
    addModal.value = true
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
    }else{
        const obj = {
            nombre : data.value.nombre,
            codigo : data.value.codigo,
            telefono : data.value.codigoTel + data.value.telefono
        }
        const result = await apiCall('materiaPrima/proveedor/','POST', obj)
        console.log(result)
    }
}

return{
    getData, items,addModal,add, data,save, notification, notificationDialog
}
})

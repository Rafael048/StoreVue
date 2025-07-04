import { defineStore } from "pinia";
import { ref } from "vue";
import { apiCall } from "../../utils/apiCall";
import validate from "../../utils/validateInfo";
import dataComprobation from "../../utils/DataComprobation";
import { useRawMaterialStore } from "./RawMaterial";
export const useRawMaterialInventoryStore = defineStore(
  "RawMaterialInventory",
  () => {
    const comprobations = dataComprobation()
    const RawMaterialStore = useRawMaterialStore();
    const items = ref([]);
    const data = ref({
      materiaPrima: "",
      cantidad: "",
      unidadInv: "",
      precio: "",
      id: "",
    });
    const lastOpen = ref("");
    const subTable = ref(false);
    const loading = ref(true);
    const dataEdit = ref({});
    const showDialog = ref(false);
    const showDialogDelete = ref(false);
    const notificationDialog = ref(false);
    const notification = ref({});
    const buttonLoading = ref(false);

    const isEdit = ref(false);
    async function getData(id) {
      lastOpen.value = id;
      const result = await apiCall(
        `materiaPrima/inventario?materiaPrima=${id}`
      );
      if (result.status != 200) {
        console.error(result.statusText);
      } else {
        items.value = result.data;
      }
      loading.value = false;
    }
    function add() {
      data.value = {
        materiaPrima: "",
        unidadInv: "",
        cantidad: "",
        precio: "",
      };
      showDialog.value = true;
    }

    function edit(item) {
        console.log(item)
      dataEdit.value = { ...item };
      data.value = {
        materiaPrima: item.materiaPrima,
        cantidad: item.cantidad,
        unidadInv: item.unidadInv,
        precio: item.precio,
      };
      isEdit.value = true;
      showDialog.value = true;
    }
    async function save() {
      buttonLoading.value = true;

      const dataValues = Object.values(data.value);

      const errors = validate(dataValues);
      if (errors.length > 0) {
        notification.value = {
          title: "Datos incompletos",
          messages: "No se pueden enviar datos vacios",
          type: "Error",
        };
        notificationDialog.value = true;
        buttonLoading.value = false;

        return;
      } else {
        if (isEdit.value) {
          const obj = comprobations.sameData(dataEdit.value, data.value);
          if (Object.getOwnPropertyNames(obj).length === 0) {
            notification.value = {
              title: "Datos sin modificar",
              messages: "No se dectaron cambios en los datos.",
              type: "Error",
            };
            notificationDialog.value = true;
            buttonLoading.value = false;

            return;
          } else {
            
         
            const result = await apiCall(
              `materiaPrima/inventario/${dataEdit.value.id}/`,
              "PATCH",
              obj
            );
            if (result.status != 200) {
              notification.value = {
                title: "Error en el servidor",
                messages: result.statusText,
                type: "Error",
              };
              notificationDialog.value = true;
              buttonLoading.value = false;

              return;
            } else {
              notification.value = {
                title: "Edición completada",
                messages: `Se ha modificado la entrada del inventario`,
                type: "Success",
              };
              notificationDialog.value = true;
              buttonLoading.value = false;

          data.value = {
            materiaPrima: "",
            cantidad: "",
          };
          await getData(lastOpen.value)
          await RawMaterialStore.getData();
          showDialog.value = false;
            }
          }
        } else {
          if (data.value.unidadInv.tipo != data.value.materiaPrima.tipoUnidad) {
            notification.value = {
              title: "Error de medida",
              messages:
                "No se pueden combinar unidades de medida de diferente tipo",
              type: "Error",
            };
            notificationDialog.value = true;
            buttonLoading.value = false;

            return;
          }
          let cantidad;
          if( data.value.materiaPrima.factorBase =
            data.value.unidadInv.factorBase){
              cantidad = data.value.cantidad
          }else if(data.value.materiaPrima.factorBase >
            data.value.unidadInv.factorBase
          ) {
            cantidad =
              data.value.cantidad *
              (data.value.materiaPrima.factorBase *
                data.value.unidadInv.factorBase);
          } else {
            cantidad =
              data.value.cantidad *
              (data.value.unidadInv.factorBase /
                data.value.materiaPrima.factorBase);
          }
          const obj = {
            materiaPrima: data.value.materiaPrima.id,
            cantidad: cantidad,
            precio: data.value.precio,
          };
          console.log(obj);
          const result = await apiCall(`materiaPrima/inventario/`, "POST", obj);
          console.log(result);
          if (result.status != 201) {
            notification.value = {
              title: "Error en el servidor",
              messages: result.statusText,
              type: "Error",
            };
            notificationDialog.value = true;
            buttonLoading.value = false;

            return;
          } else {
            notification.value = {
              title: "Registro completado",
              messages: `Se han agregado ${obj.cantidad} ${data.value.unidadInv.nombre} al inventario de la materia prima  ${data.value.materiaPrima.nombre}`,
              type: "Success",
            };
            notificationDialog.value = true;
          }

          buttonLoading.value = false;

          data.value = {
            materiaPrima: "",
            cantidad: "",
          };
          await RawMaterialStore.getData();
          showDialog.value = false;
        }
      }
    }
    async function removeItem(item) {
      const obj = {
        eliminado: true,
      };
      const result = await apiCall(
        `materiaPrima/inventario/${item.id}/`,
        "PATCH",
        obj
      );
      if (result.status != 200) {
        notification.value = {
          title: "Error en el servidor",
          messages: result.statusText,
          type: "Error",
        };
        notificationDialog.value = true;
        return;
      } else {
        notification.value = {
          title: "Eliminacion completada",
          messages: `Se ha eliminado la entrada del inventario`,
          type: "Success",
        };
        notificationDialog.value = true;
      }
      showDialogDelete.value = false;

      await RawMaterialStore.getData();
      await getData(lastOpen.value);
    }

    return {
      getData,
      items,
      showDialog,
      add,
      data,
      save,
      notification,
      notificationDialog,
      edit,
      isEdit,
      dataEdit,
      showDialogDelete,
      loading,
      buttonLoading,
      subTable,
      removeItem,
    };
  }
);

//libs
import Swal from 'sweetalert2';

const swalWithMaterialStyles = customClass =>
  Swal.mixin({
    customClass: {
      confirmButton: 'swal2-button swal2-button-confirm',
      cancelButton: 'swal2-button swal2-button-cancel',
      title: 'swal2-title',
      container: 'swal2-container',
      ...customClass,
    },
    allowOutsideClick: false,
    showCloseButton: false,
    focusConfirm: false,
    buttonsStyling: false,
  });

export const deleteAlert = async (
  title = 'Title',
  text = 'Text',
  config = {},
  customClass = {}
) => {
  const { value } = await swalWithMaterialStyles(customClass).fire({
    title,
    text,
    icon: 'warning',
    showCancelButton: true,
    reverseButtons: true,
    cancelButtonText: 'Cancelar',
    confirmButtonText: 'Sí, eliminar',
    ...config,
  });
  return value;
};

export const confirmAlert = async (
  title = 'Title',
  text = '',
  config = {},
  customClass = {}
) => {
  const { value } = await swalWithMaterialStyles(customClass).fire({
    title,
    text,
    icon: 'question',
    showCancelButton: true,
    reverseButtons: true,
    cancelButtonText: 'Cancelar',
    confirmButtonText: 'Sí, eliminar',
    ...config,
  });
  return value;
};
export const messageAlert = async (
  title = 'Title',
  text = 'Text',
  config = {},
  customClass = {}
) => {
  const { value } = await swalWithMaterialStyles(customClass).fire({
    title,
    text,
    icon: 'info',
    reverseButtons: true,
    confirmButtonText: 'Aceptar',
    ...config,
  });
  return value;
};

import Swal from 'sweetalert2';

export function notificar(mensaje: string): void {
  Swal.fire({
    toast: true,
    position: 'top-end',
    icon: 'success',
    title: mensaje,
    showConfirmButton: false,
    timer: 2200,
    timerProgressBar: true,
  });
}

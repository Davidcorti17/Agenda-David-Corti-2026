import { Component, computed, inject, input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { ContactosService } from '../../../services/contactos.service';
import { notificar } from '../../../services/notificacion';

@Component({
  imports: [RouterLink],
  selector: 'app-contacto-detalle',
  styleUrl: './contacto-detalle.scss',
  templateUrl: './contacto-detalle.html',
})
export class ContactoDetalle {
  private readonly router = inject(Router);
  protected readonly servicio = inject(ContactosService);

  public readonly id = input.required<string>();
  protected readonly contacto = computed(() => this.servicio.obtener(Number(this.id())));

  protected async eliminar(): Promise<void> {
    const contacto = this.contacto();
    if (!contacto) {
      return;
    }

    const resultado = await Swal.fire({
      icon: 'warning',
      title: `¿Eliminar a ${contacto.nombre || 'este contacto'}?`,
      text: 'Esta acción no se puede deshacer.',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#c0392b',
      cancelButtonColor: '#1a2a4a',
    });

    if (!resultado.isConfirmed) {
      return;
    }

    await this.router.navigate(['/contactos']);
    this.servicio.eliminar(contacto.id);
    notificar('Contacto eliminado');
  }
}

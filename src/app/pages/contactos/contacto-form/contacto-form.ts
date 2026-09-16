import { Component, computed, effect, inject, input, signal } from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import { Router } from '@angular/router';
import { ContactosService, contactoVacio } from '../../../services/contactos.service';
import { notificar } from '../../../services/notificacion';

@Component({
  imports: [FormField],
  selector: 'app-contacto-form',
  styleUrl: './contacto-form.scss',
  templateUrl: './contacto-form.html',
})
export class ContactoForm {
  private readonly router = inject(Router);
  private readonly servicio = inject(ContactosService);

  protected readonly idInput = input<string | undefined>(undefined, { alias: 'id' });
  protected readonly id = computed(() => this.idInput() ?? '');
  protected readonly esEdicion = computed(() => this.id() !== '');

  protected readonly datosContacto = signal(contactoVacio());
  protected readonly contactoForm = form(this.datosContacto);

  constructor() {
    effect(() => {
      const id = this.id();
      const existente = id ? this.servicio.obtener(Number(id)) : undefined;

      if (existente) {
        const { id: _id, ...datos } = existente;
        this.datosContacto.set(datos);
      }
    });
  }

  protected async guardar(): Promise<void> {
    const id = this.id();

    if (id) {
      this.servicio.actualizar(Number(id), this.datosContacto());
    } else {
      this.servicio.agregar(this.datosContacto());
    }

    await this.router.navigate(id ? ['/contactos', id] : ['/contactos']);
    notificar(id ? 'Contacto guardado' : 'Contacto creado');
  }
}

import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContactosService } from '../../services/contactos.service';

@Component({
  imports: [RouterLink],
  selector: 'app-contactos',
  styleUrl: './contactos.scss',
  templateUrl: './contactos.html',
})
export class Contactos {
  protected readonly servicio = inject(ContactosService);
}

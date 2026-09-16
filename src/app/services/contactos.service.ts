import { Service, signal } from '@angular/core';

export interface Contacto {
  id: number;
  nombre: string;
  direccion: string;
  telefono: string;
  celular: string;
  email: string;
  cumple: string;
}

export function contactoVacio(): Omit<Contacto, 'id'> {
  return { nombre: '', direccion: '', telefono: '', celular: '', email: '', cumple: '' };
}

@Service()
export class ContactosService {
  private siguienteId = 4;

  private readonly listaContactos = signal<Contacto[]>([
    {
      id: 1,
      nombre: 'David',
      direccion: 'Av. Siempre Viva 742',
      telefono: '11111111111111',
      celular: '11111111111111',
      email: 'david@mail.com',
      cumple: '12/03',
    },
    {
      id: 2,
      nombre: 'Corti',
      direccion: 'Calle Falsa 123',
      telefono: '11111111111111',
      celular: '11111111111111',
      email: 'corti@mail.com',
      cumple: '05/09',
    },
    {
      id: 3,
      nombre: 'Facundo',
      direccion: 'Pasaje del Sol 45',
      telefono: '11111111111111',
      celular: '11111111111111',
      email: 'facundo@mail.com',
      cumple: '28/11',
    },
  ]);

  public readonly contactos = this.listaContactos.asReadonly();

  public obtener(id: number): Contacto | undefined {
    return this.listaContactos().find((contacto) => contacto.id === id);
  }

  public agregar(datos: Omit<Contacto, 'id'>): void {
    const id = this.siguienteId++;
    this.listaContactos.update((lista) => [...lista, { ...datos, id }]);
  }

  public actualizar(id: number, datos: Omit<Contacto, 'id'>): void {
    this.listaContactos.update((lista) =>
      lista.map((contacto) => (contacto.id === id ? { ...datos, id } : contacto)),
    );
  }

  public eliminar(id: number): void {
    this.listaContactos.update((lista) => lista.filter((contacto) => contacto.id !== id));
  }
}

import { Service, signal } from '@angular/core';
import { Contact, CreateOrUpdateContact } from '../interface/contact';

const USUARIO_ACTUAL = 1;

export function contactoVacio() {
  return {
    firstName: '',
    lastName: '',
    address: '',
    number: '',
    email: '',
    image: '',
    company: '',
    description: '',
  };
}

@Service()
export class ContactosService {
  private siguienteId = 4;

  private readonly listaContactos = signal<Contact[]>([
    {
      id: 1,
      firstName: 'David',
      lastName: 'Corti',
      address: 'Av. Siempre Viva 742',
      number: '1111111111',
      email: 'david@mail.com',
      image: null,
      company: 'Acme',
      description: 'Compañero de cursada',
      userId: USUARIO_ACTUAL,
      isFavorite: false,
    },
    {
      id: 2,
      firstName: 'Nicolás',
      lastName: 'Bologna',
      address: 'Calle Falsa 123',
      number: '2222222222',
      email: 'nicolas@mail.com',
      image: null,
      company: 'UTN',
      description: 'Profesor de la materia',
      userId: USUARIO_ACTUAL,
      isFavorite: true,
    },
    {
      id: 3,
      firstName: 'Facundo',
      lastName: 'Gómez',
      address: 'Pasaje del Sol 45',
      number: '3333333333',
      email: 'facundo@mail.com',
      image: null,
      company: null,
      description: '',
      userId: USUARIO_ACTUAL,
      isFavorite: false,
    },
  ]);

  public readonly contactos = this.listaContactos.asReadonly();

  public obtener(id: number): Contact | undefined {
    return this.listaContactos().find((contacto) => contacto.id === id);
  }

  public agregar(datos: CreateOrUpdateContact): void {
    const nuevo: Contact = {
      id: this.siguienteId++,
      firstName: datos.firstName,
      lastName: datos.lastName ?? null,
      address: datos.address ?? null,
      number: datos.number ?? null,
      email: datos.email ?? null,
      image: datos.image ?? null,
      company: datos.company ?? null,
      description: datos.description ?? '',
      userId: USUARIO_ACTUAL,
      isFavorite: false,
    };

    this.listaContactos.update((lista) => [...lista, nuevo]);
  }

  public actualizar(id: number, datos: CreateOrUpdateContact): void {
    this.listaContactos.update((lista) =>
      lista.map((contacto) =>
        contacto.id === id
          ? {
              ...contacto,
              firstName: datos.firstName,
              lastName: datos.lastName ?? null,
              address: datos.address ?? null,
              number: datos.number ?? null,
              email: datos.email ?? null,
              image: datos.image ?? null,
              company: datos.company ?? null,
              description: datos.description ?? '',
            }
          : contacto,
      ),
    );
  }

  public eliminar(id: number): void {
    this.listaContactos.update((lista) => lista.filter((contacto) => contacto.id !== id));
  }
}

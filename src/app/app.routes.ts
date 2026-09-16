import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  {
    path: 'login',
    component: Login,
  },
  {
    path: 'register',
    component: Register,
  },
  {
    path: 'contactos',
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/contactos/contactos').then((m) => m.Contactos),
      },
      {
        path: 'nuevo',
        loadComponent: () =>
          import('./pages/contactos/contacto-form/contacto-form').then((m) => m.ContactoForm),
      },
      {
        path: ':id/editar',
        loadComponent: () =>
          import('./pages/contactos/contacto-form/contacto-form').then((m) => m.ContactoForm),
      },
      {
        path: ':id',
        loadComponent: () =>
          import('./pages/contactos/contacto-detalle/contacto-detalle').then(
            (m) => m.ContactoDetalle,
          ),
      },
    ],
  },
];

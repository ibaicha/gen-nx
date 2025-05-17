import { Route } from '@angular/router'

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./composants/home/home.component').then((m) => m.HomeComponent),
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./composants/home/home.component').then((m) => m.HomeComponent),
  },
  
  {
    path: 'clients',
    loadComponent: () =>
      import('./composants/application/client/client.component').then(
        (m) => m.ClientComponent,
      ),
  },

  {
    path: 'ops',
    loadComponent: () =>
      import('./composants/application/op/op.component').then(
        (m) => m.OpComponent,
      ),
  },

  {
    path: 'credit-agence',
    loadComponent: () =>
      import(
        './composants/application/credit-agence/credit-agence.component'
      ).then((m) => m.CreditAgenceComponent),
  },
]

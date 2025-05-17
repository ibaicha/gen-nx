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
    path: 'filieres',
    loadComponent: () =>
      import('./composants/filiere/filiere.component').then(
        (m) => m.FiliereComponent,
      ),
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
    path: 'credit-campagne',
    loadComponent: () =>
      import(
        './composants/application/credit-campagne/credit-campagne.component'
      ).then((m) => m.CreditCampagneComponent),
  },
  {
    path: 'credit-agence',
    loadComponent: () =>
      import(
        './composants/application/credit-agence/credit-agence.component'
      ).then((m) => m.CreditAgenceComponent),
  },
  {
    path: 'credit-campagne-etablissement',
    loadComponent: () =>
      import(
        './composants/application/credit-campagne-etablissement/credit-campagne-etablissement.component'
      ).then((m) => m.CreditCampagneEtablissementComponent),
  },

  {
    path: 'credit-societe',
    loadComponent: () =>
      import(
        './composants/application/credit-societe/credit-societe.component'
      ).then((m) => m.CreditSocieteComponent),
  },

  {
    path: 'credit-campagne-titre',
    loadComponent: () =>
      import(
        './composants/application/credit-campagne-titre/credit-campagne-titre.component'
      ).then((m) => m.CreditCampagneTitreComponent),
  },
  {
    path: 'mouvement-intrant',
    loadComponent: () =>
      import(
        './composants/application/intrant/mouvement-intrant/mouvement-intrant.component'
      ).then((m) => m.MouvementIntrantComponent),
  },
  {
    path: 'point-mouvement-intrant',
    loadComponent: () =>
      import(
        './composants/application/intrant/point-mouvement-intrant/point-mouvement-intrant.component'
      ).then((m) => m.PointMouvementIntrantComponent),
  },
  {
    path: 'stock-mouvement-intrant',
    loadComponent: () =>
      import(
        './composants/application/intrant/stock-mouvement-intrant/stock-mouvement-intrant.component'
      ).then((m) => m.StockMouvementIntrantComponent),
  },
]

import { Routes } from '@angular/router';


export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'cloud',
    loadComponent: () => import('./cloud/cloud.page').then( m => m.CloudPage)
  },
  {
    path: 'lab3-abstract',
    loadComponent: () => import('./lab3-abstract/lab3-abstract.page').then( m => m.Lab3AbstractPage)
  },
];

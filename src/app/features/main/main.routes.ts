import { Routes } from '@angular/router';

export const mainRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./main').then((c) => c.Main),
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'overview',
      },
      {
        path: 'overview',
        loadComponent: () => import('./overview/overview').then((c) => c.Overview),
        title: 'Overview',
      },
      {
        path: 'transactions',
        loadComponent: () => import('./transactions/transactions').then((c) => c.Transactions),
        title: 'Transactions',
      },
      {
        path: 'budgets',
        loadComponent: () => import('./budgets/budgets').then((c) => c.Budgets),
        title: 'Budgets',
      },
      {
        path: 'pots',
        loadComponent: () => import('./pots-page/pots').then((c) => c.Pots),
        title: 'Pots',
      },
      {
        path: 'recurring-bills',
        loadComponent: () => import('./recurring/recurring').then((c) => c.RecurringBills),
        title: 'Recurring Bills',
      },
      {
        path: 'settings',
        loadComponent: () => import('./settings/settings').then((c) => c.Settings),
        title: 'Settings',
      },
    ],
  },
];

import { Routes } from '@angular/router';

import { authGuard } from './core/guards/auth.guard';
import { loginGuard } from './core/guards/login.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login').then((m) => m.Login),
    canActivate: [loginGuard],
    title: 'Sign in | Personal Finance',
  },
  {
    path: 'overview',
    loadComponent: () => import('./features/overview/overview').then((m) => m.Overview),
    canActivate: [authGuard],
    title: 'Overview | Personal Finance',
  },
  { path: '', redirectTo: 'overview', pathMatch: 'full' },
  { path: '**', redirectTo: 'overview' },
];

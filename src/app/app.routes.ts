import { Routes } from '@angular/router';

import { authGuard } from './core/guards/auth.guard';
import { loginGuard } from './core/guards/login.guard';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.routes').then((m) => m.authRoutes),
    canActivate: [loginGuard],
  },
  {
    path: 'overview',
    loadComponent: () => import('./features/overview/overview').then((m) => m.Overview),
    canActivate: [authGuard],
    title: 'Overview | Personal Finance',
  },
  { path: '', redirectTo: 'overview', pathMatch: 'full' },
  { path: 'login', redirectTo: 'auth/login', pathMatch: 'full' },
  { path: '**', redirectTo: 'overview' },
];

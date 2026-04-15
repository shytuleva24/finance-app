import { Routes } from '@angular/router';

import { authGuard } from './core/guards/auth.guard';
import { loginGuard } from './core/guards/login.guard';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('@app/features/auth/auth.routes').then((r) => r.authRoutes),
    canActivate: [loginGuard],
  },
  {
    path: '',
    loadChildren: () => import('@app/features/main/main.routes').then((r) => r.mainRoutes),
    canActivate: [authGuard],
  },
  {
    path: '**',
    loadComponent: () => import('@app/features/not-found/not-found').then((m) => m.NotFound),
  },
];

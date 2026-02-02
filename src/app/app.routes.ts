import { Routes } from '@angular/router';

import { authGuard } from './core/guards/auth.guard';
import { loginGuard } from './core/guards/login.guard';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.routes').then((r) => r.authRoutes),
    canActivate: [loginGuard],
  },
  {
    path: '',
    loadChildren: () => import('./features/main/main.routes').then((r) => r.mainRoutes),
    canActivate: [authGuard],
  },
  { path: 'login', redirectTo: 'auth/login', pathMatch: 'full' },
  { path: '**', redirectTo: 'overview' },
];

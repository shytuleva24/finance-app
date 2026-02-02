import { Routes } from '@angular/router';

export const authRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./auth').then((c) => c.Auth),
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login',
      },
      {
        path: 'login',
        loadComponent: () => import('./login/login').then((c) => c.Login),
        title: 'Login',
      },
      {
        path: 'sign-up',
        loadComponent: () => import('./sign-up/sign-up').then((c) => c.SignUp),
        title: 'Sign Up',
      },
    ],
  },
];

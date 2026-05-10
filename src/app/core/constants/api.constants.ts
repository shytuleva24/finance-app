import { inject, InjectionToken } from '@angular/core';

export const API_URL = new InjectionToken<string>('API_URL');

export const AUTH_URL = new InjectionToken<string>('AUTH_URL', {
  providedIn: 'root',
  factory: () => {
    const api = inject(API_URL);
    return `${api}/auth`;
  },
});

export const CATEGORIES_URL = new InjectionToken<string>('CATEGORIES_URL', {
  providedIn: 'root',
  factory: () => {
    const api = inject(API_URL);
    return `${api}/categories`;
  },
});

export const TRANSACTION_CATEGORIES_URL = new InjectionToken<string>('TRANSACTION_CATEGORIES_URL', {
  providedIn: 'root',
  factory: () => {
    const api = inject(API_URL);
    return `${api}/transactions/categories`;
  },
});

export const TRANSACTIONS_URL = new InjectionToken<string>('TRANSACTIONS_URL', {
  providedIn: 'root',
  factory: () => {
    const api = inject(API_URL);
    return `${api}/transactions`;
  },
});

export const OVERVIEW_URL = new InjectionToken<string>('OVERVIEW_URL', {
  providedIn: 'root',
  factory: () => {
    const api = inject(API_URL);
    return `${api}/overview`;
  },
});

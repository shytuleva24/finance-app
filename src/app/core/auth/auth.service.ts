import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { AuthRequest } from '../models/auth.model';
import { AUTH_URL } from '../constants/api.constants';
import { BrowserService } from '../services/browser.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = inject(AUTH_URL);
  private readonly browser = inject(BrowserService);
  private readonly TOKEN_KEY = 'auth_token';

  private readonly token = signal<string | null>(this.getStoredToken());
  readonly isAuthenticated = computed(() => this.token() !== null);

  login(credentials: AuthRequest): Observable<string> {
    return this.http.post(`${this.baseUrl}/login`, credentials, { responseType: 'text' }).pipe(
      tap((token) => {
        console.log('Login successful, received token:', token);
        return this.handleAuthSuccess(token);
      }),
    );
  }

  register(credentials: AuthRequest & { name?: string }): Observable<string> {
    return this.http.post(`${this.baseUrl}/register`, credentials, { responseType: 'text' }).pipe(
      tap((token) => {
        console.log('Registration successful, received token:', token);
        return this.handleAuthSuccess(token);
      }),
    );
  }

  logout(): void {
    this.token.set(null);
    localStorage.removeItem(this.TOKEN_KEY);
  }

  private handleAuthSuccess(token: string): void {
    this.token.set(token);
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  private getStoredToken(): string | null {
    if (this.browser.isBrowser() && window.localStorage) {
      return localStorage.getItem(this.TOKEN_KEY);
    }
    return null;
  }
}

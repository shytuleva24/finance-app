import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { AuthRequest, AuthResponse } from '../models/auth.model';
import { AUTH_URL } from '../constants/api.constants';
import { BrowserService } from '../services/browser.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = inject(AUTH_URL);
  private readonly browser = inject(BrowserService);
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_NAME_KEY = 'auth_user_name';

  private readonly token = signal<string | null>(this.getStoredToken());
  private readonly name = signal<string | null>(this.getStoredName());

  readonly isAuthenticated = computed(() => this.token() !== null);
  readonly userName = this.name.asReadonly();

  login(credentials: AuthRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/login`, credentials).pipe(
      tap((response) => {
        console.log('Login successful, received user info:', response.name);
        this.handleAuthSuccess(response);
      }),
    );
  }

  register(credentials: AuthRequest & { name?: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/register`, credentials).pipe(
      tap((response) => {
        console.log('Registration successful, received user info:', response.name);
        this.handleAuthSuccess(response);
      }),
    );
  }

  logout(): void {
    this.token.set(null);
    this.name.set(null);
    if (this.browser.isBrowser()) {
      localStorage.removeItem(this.TOKEN_KEY);
      localStorage.removeItem(this.USER_NAME_KEY);
    }
  }

  private handleAuthSuccess(response: AuthResponse): void {
    this.token.set(response.accessToken);
    this.name.set(response.name);
    if (this.browser.isBrowser()) {
      localStorage.setItem(this.TOKEN_KEY, response.accessToken);
      localStorage.setItem(this.USER_NAME_KEY, response.name);
    }
  }

  private getStoredToken(): string | null {
    if (this.browser.isBrowser() && window.localStorage) {
      return localStorage.getItem(this.TOKEN_KEY);
    }
    return null;
  }

  private getStoredName(): string | null {
    if (this.browser.isBrowser() && window.localStorage) {
      return localStorage.getItem(this.USER_NAME_KEY);
    }
    return null;
  }
}

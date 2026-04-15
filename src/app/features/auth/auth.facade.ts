import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/core/services/auth.service';
import { AuthRequest, AuthResponse } from '@app/core/models/auth.model';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthFacade {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  login(credentials: AuthRequest): Observable<AuthResponse> {
    return this.auth
      .login({
        email: credentials.email.trim().toLowerCase(),
        password: credentials.password.trim(),
      })
      .pipe(
        tap(async () => {
          await this.router.navigate(['/overview']);
        }),
        catchError((err) => {
          const message = this.parseError(err);
          return throwError(() => new Error(message));
        }),
      );
  }

  register(data: AuthRequest & { name: string }): Observable<AuthResponse> {
    return this.auth
      .register({
        name: data.name.trim(),
        email: data.email.trim().toLowerCase(),
        password: data.password.trim(),
      })
      .pipe(
        tap(async () => {
          await this.router.navigate(['/overview']);
        }),
        catchError((err) => {
          const message = this.parseError(err);
          return throwError(() => new Error(message));
        }),
      );
  }

  private parseError(err: unknown): string {
    const error = err as { error?: { detailMessage?: string; message?: string } };
    return (
      error.error?.detailMessage ||
      error.error?.message ||
      'An unexpected error occurred. Please try again.'
    );
  }
}

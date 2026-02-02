import { computed, Injectable, signal } from '@angular/core';

/** In-memory auth state. Replace with API/backend when implementing full-stack. */
@Injectable({ providedIn: 'root' })
export class AuthService {
  /** Current user id if logged in; null otherwise. */
  private readonly currentUserId = signal<string | null>(null);

  /** True if user is authenticated. */
  readonly isAuthenticated = computed(() => this.currentUserId() !== null);

  /** Logs in with the given user id (for demo; replace with real credentials). */
  login(userId: string): void {
    this.currentUserId.set(userId);
  }

  /** Logs out the current user. */
  logout(): void {
    this.currentUserId.set(null);
  }
}

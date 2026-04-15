/**
 * Represents the authentication state of the application.
 */
export interface AuthState {
  readonly isAuthenticated: boolean;
  readonly username: string | null;
  readonly token: string | null;
  readonly avatar?: string | null;
}

export interface AuthResponse {
  readonly token: string;
  readonly user?: {
    readonly id: string;
    readonly email: string;
    readonly name?: string;
  };
}

export interface AuthRequest {
  readonly email: string;
  readonly password: string;
}

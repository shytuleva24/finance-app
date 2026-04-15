export interface AuthResponse {
  readonly accessToken: string;
  readonly refreshToken: string | null;
  readonly name: string;
}

export interface AuthRequest {
  readonly email: string;
  readonly password: string;
}

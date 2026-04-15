import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '@app/core/services/auth.service';
import { AUTH_URL } from '../constants/api.constants';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const authUrl = inject(AUTH_URL);

  const token = authService.token();

  if (!token || req.url.startsWith(authUrl)) {
    return next(req);
  }

  const cloned = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });

  return next(cloned);
};

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { AuthService } from '@app/core/auth/auth.service';
import { BrowserService } from '@app/core/services/browser.service';

/** Protects routes: allows access only when user is authenticated; otherwise redirects to login. */
export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const browser = inject(BrowserService);

  if (!browser.isBrowser()) {
    return true;
  }

  if (auth.isAuthenticated()) {
    return true;
  }
  return router.createUrlTree(['/auth/login']);
};

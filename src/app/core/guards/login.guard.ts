import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { AuthService } from '@app/core/auth/auth.service';
import { BrowserService } from '@app/core/services/browser.service';

/** Prevents authenticated users from seeing login: redirects to overview. */
export const loginGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const browser = inject(BrowserService);

  if (!browser.isBrowser()) {
    return true;
  }

  if (!auth.isAuthenticated()) {
    return true;
  }
  return router.createUrlTree(['/overview']);
};

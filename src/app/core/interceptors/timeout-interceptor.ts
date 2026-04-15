import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { timeout, catchError, throwError, TimeoutError } from 'rxjs';
import { SnackbarService } from '@app/core/services/snackbar.service';

export const timeoutInterceptor: HttpInterceptorFn = (req, next) => {
  const snackbarService = inject(SnackbarService);
  const TIMEOUT_DURATION = 5000;

  return next(req).pipe(
    timeout(TIMEOUT_DURATION),
    catchError((error) => {
      if (error instanceof TimeoutError || error.name === 'TimeoutError') {
        snackbarService.show(
          'Sorry, there are temporary difficulties. The request was cancelled due to timeout.',
          'error',
        );
      }
      return throwError(() => error);
    }),
  );
};

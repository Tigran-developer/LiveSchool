import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import {inject, Injector} from '@angular/core';
import {Router} from '@angular/router';
import {catchError, throwError} from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const injector = inject(Injector);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        router.navigate(['/']);
      }
      return throwError(() => error);
    })
  );
};

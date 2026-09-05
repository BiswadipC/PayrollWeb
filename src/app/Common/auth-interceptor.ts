import { HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { BehaviorSubject, catchError, filter, switchMap, take, throwError } from 'rxjs';
import { AuthService } from '../Services/auth-service';
import { inject } from '@angular/core';

let isRefreshing = false;
const refreshTokenSubject: BehaviorSubject<boolean | null> = new BehaviorSubject<boolean | null>(null);

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const authService = inject(AuthService);

  // 1. Force the browser to send HttpOnly cookies with every API request
  const authReq = req.clone({ withCredentials: true });

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      // 2. Check if the error is a 401 Unauthorized (Expired Access Token)
      if (error.status === 401 && !authReq.url.includes('/Refresh')) {
        return handle401Error(authReq, next, authService);
      }
      return throwError(() => error);
    })
  );
};

// Helper function to handle the refresh token logic and request queueing
function handle401Error(request: HttpRequest<unknown>, next: HttpHandlerFn, authService: AuthService) {
  if (!isRefreshing) {
    isRefreshing = true;
    refreshTokenSubject.next(null);

    return authService.RefreshTokens().pipe(
      switchMap(() => {
        isRefreshing = false;
        refreshTokenSubject.next(true);
        // Retry the original request now that cookies are refreshed
        return next(request);
      }),
      catchError((err) => {
        isRefreshing = false;
        refreshTokenSubject.next(false);
        authService.LogOut(); // Clear session if refresh fails
        return throwError(() => err);
      })
    );
  } else {
    // If a refresh is already in progress, wait for it to complete
    return refreshTokenSubject.pipe(
      filter(result => result !== null),
      take(1),
      switchMap(success => {
        if (success) {
          return next(request); // Retry original request
        }
        return throwError(() => new Error('Refresh token expired'));
      })
    );
  }
}

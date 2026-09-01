// src/app/modules/auth/interceptors/auth.interceptor.ts
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, filter, take, switchMap, finalize } from 'rxjs/operators';
import { TokenService } from '../services/token.service';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject = new BehaviorSubject<string | null>(null);

  constructor(
    private tokenService: TokenService,
    private authService: AuthService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Skip auth endpoints
    if (this.isAuthEndpoint(req.url)) {
      return next.handle(req);
    }

    const token = this.tokenService.getAccessToken();

    if (token) {
      req = this.addToken(req, token);

      // Proactively refresh if token is close to expiry
      if (this.tokenService.shouldRefreshToken() && !this.isRefreshing) {
        return this.handleTokenRefresh(req, next);
      }
    }

    return next.handle(req).pipe(
      catchError(error => {
        if (error.status === 401 && !this.isAuthEndpoint(req.url)) {
          return this.handleTokenRefresh(req, next);
        }
        return throwError(() => error);
      })
    );
  }

  private addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
    return req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  private handleTokenRefresh(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.authService.refreshToken().pipe(
        switchMap(response => {
          if (response.success && response.data) {
            this.refreshTokenSubject.next(response.data.tokens.access_token);
            return next.handle(this.addToken(req, response.data.tokens.access_token));
          }
          this.authService.logout();
          return throwError(() => new Error('Token refresh failed'));
        }),
        catchError(error => {
          this.authService.logout();
          return throwError(() => error);
        }),
        finalize(() => {
          this.isRefreshing = false;
        })
      );
    }

    // Queue other requests while refreshing
    return this.refreshTokenSubject.pipe(
      filter(token => token !== null),
      take(1),
      switchMap(token => next.handle(this.addToken(req, token!)))
    );
  }

  private isAuthEndpoint(url: string): boolean {
    const authPaths = ['/auth/login', '/auth/refresh', '/auth/forgot-password', '/auth/reset-password', '/auth/verify-otp'];
    return authPaths.some(path => url.includes(path));
  }
}

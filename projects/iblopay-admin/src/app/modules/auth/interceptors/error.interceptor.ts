// src/app/modules/auth/interceptors/error.interceptor.ts
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AUTH_CONSTANTS } from '../auth.constants';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = AUTH_CONSTANTS.MESSAGES.NETWORK_ERROR;

        switch (error.status) {
          case 0:
            errorMessage = AUTH_CONSTANTS.MESSAGES.NETWORK_ERROR;
            break;
          case 400:
            errorMessage = error.error?.message || 'Requête invalide';
            break;
          case 401:
            errorMessage = AUTH_CONSTANTS.MESSAGES.SESSION_EXPIRED;
            break;
          case 403:
            errorMessage = AUTH_CONSTANTS.MESSAGES.UNAUTHORIZED;
            break;
          case 404:
            errorMessage = 'Ressource introuvable';
            break;
          case 409:
            errorMessage = error.error?.message || 'Conflit de données';
            break;
          case 422:
            errorMessage = error.error?.message || 'Données de validation invalides';
            break;
          case 429:
            errorMessage = 'Trop de tentatives. Veuillez patienter.';
            break;
          case 500:
            errorMessage = 'Erreur serveur. Veuillez réessayer plus tard.';
            break;
          default:
            errorMessage = error.error?.message || AUTH_CONSTANTS.MESSAGES.NETWORK_ERROR;
        }

        console.error(`[HTTP Error ${error.status}]`, errorMessage, error);

        return throwError(() => ({
          ...error,
          userMessage: errorMessage
        }));
      })
    );
  }
}

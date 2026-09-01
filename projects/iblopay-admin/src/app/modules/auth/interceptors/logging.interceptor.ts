// src/app/modules/auth/interceptors/logging.interceptor.ts
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const startTime = Date.now();

    return next.handle(req).pipe(
      tap({
        next: (event) => {
          if (event instanceof HttpResponse) {
            const duration = Date.now() - startTime;
            console.log(
              `%c[API] ${req.method} ${req.urlWithParams} → ${event.status} (${duration}ms)`,
              this.getLogStyle(event.status)
            );
          }
        },
        error: (error) => {
          const duration = Date.now() - startTime;
          console.error(
            `%c[API] ${req.method} ${req.urlWithParams} → ${error.status} (${duration}ms)`,
            'color: #ff4444; font-weight: bold;'
          );
        }
      })
    );
  }

  private getLogStyle(status: number): string {
    if (status >= 200 && status < 300) {
      return 'color: #00C853; font-weight: bold;';
    }
    if (status >= 300 && status < 400) {
      return 'color: #FF9800; font-weight: bold;';
    }
    return 'color: #ff4444; font-weight: bold;';
  }
}

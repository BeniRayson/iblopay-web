// src/app/modules/auth/interceptors/loading.interceptor.ts
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  private activeRequests = 0;
  private isLoading$ = new BehaviorSubject<boolean>(false);

  readonly loading$ = this.isLoading$.asObservable();

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Skip loading indicator for background/silent requests
    if (req.headers.has('X-Silent')) {
      return next.handle(req);
    }

    this.activeRequests++;
    if (this.activeRequests === 1) {
      this.isLoading$.next(true);
    }

    return next.handle(req).pipe(
      finalize(() => {
        this.activeRequests--;
        if (this.activeRequests === 0) {
          this.isLoading$.next(false);
        }
      })
    );
  }
}

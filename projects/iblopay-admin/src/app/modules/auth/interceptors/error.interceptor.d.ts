import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
export declare class ErrorInterceptor implements HttpInterceptor {
    private router;
    constructor(router: Router);
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>;
}
//# sourceMappingURL=error.interceptor.d.ts.map